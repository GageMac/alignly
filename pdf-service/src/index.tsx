import express from "express";
import cors from "cors";
import React from "react";
import {
  pdf,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { RenderRequestSchema } from "./validation/schemas";
import ModernTemplate from "./templates/modern/ModernTemplate";
import CorporateTemplate from "./templates/corporate/CorporateTemplate";
import CreativeTemplate from "./templates/creative/CreativeTemplate";
import MinimalTemplate from "./templates/minimal/MinimalTemplate";
import { RenderRequest, RenderResponse } from "./types/resume";

// Simple dummy template for testing
const DummyTemplate = () => (
  <Document>
    <Page size="A4">
      <View style={{ margin: 30 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Test Resume</Text>
        <Text style={{ fontSize: 12 }}>
          This is a dummy template to test PDF generation
        </Text>
      </View>
    </Page>
  </Document>
);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    availableTemplates: ["modern", "corporate", "creative", "minimal", "dummy"],
  });
});

// Get available templates
app.get("/templates", (req, res) => {
  res.json({
    templates: [
      {
        id: "modern",
        name: "Modern Professional",
        description:
          "Clean, modern design with two-column layout and professional styling",
        colorSchemes: ["blue", "green", "purple", "black"],
        features: [
          "Two-column layout",
          "Professional styling",
          "ATS-friendly",
          "Color accents",
        ],
      },
      {
        id: "corporate",
        name: "Corporate Classic",
        description:
          "Traditional corporate design with serif fonts and formal styling",
        colorSchemes: ["navy", "charcoal", "burgundy", "forest"],
        features: [
          "Classic styling",
          "Serif fonts",
          "Formal layout",
          "Conservative design",
        ],
      },
      {
        id: "creative",
        name: "Creative Professional",
        description:
          "Modern creative design with elegant accents and vibrant colors",
        colorSchemes: ["coral", "teal", "violet", "rose"],
        features: [
          "Creative layout",
          "Elegant accents",
          "Color header",
          "Modern typography",
        ],
      },
      {
        id: "minimal",
        name: "Minimal Clean",
        description: "Simple, clean design focusing on content clarity",
        colorSchemes: ["blue", "green", "purple", "black"],
        features: [
          "Minimal design",
          "Clean layout",
          "Focus on content",
          "Simple styling",
        ],
      },
    ],
  });
});

// PDF rendering endpoint
app.post("/render", async (req, res) => {
  try {
    console.log("Received render request");

    // Validate request
    const validationResult = RenderRequestSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: `Validation error: ${validationResult.error.issues
          .map((i) => i.message)
          .join(", ")}`,
      });
    }

    const renderRequest: RenderRequest = validationResult.data;

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="resume-${renderRequest.resume.contact.name
        .replace(/\s+/g, "-")
        .toLowerCase()}.pdf"`
    );

    // Generate PDF based on template
    let pdfDocument;
    const colorScheme = renderRequest.options?.colorScheme;

    switch (renderRequest.template) {
      case "modern":
        pdfDocument = (
          <ModernTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "blue" | "green" | "purple" | "black"}
          />
        );
        break;

      case "corporate":
        pdfDocument = (
          <CorporateTemplate
            resume={renderRequest.resume}
            colorScheme={
              colorScheme as "navy" | "charcoal" | "burgundy" | "forest"
            }
          />
        );
        break;

      case "creative":
        pdfDocument = (
          <CreativeTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "coral" | "teal" | "violet" | "rose"}
          />
        );
        break;

      case "minimal":
        pdfDocument = (
          <MinimalTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "blue" | "green" | "purple" | "black"}
          />
        );
        break;

      case "dummy":
        pdfDocument = <DummyTemplate />;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: `Unknown template: ${renderRequest.template}. Available templates: modern, corporate, creative, minimal, dummy`,
        });
    }

    console.log("📋 Starting PDF generation...");

    // Generate PDF using toBlob (which works correctly in v3.4.0)
    const pdfInstance = pdf(pdfDocument);

    try {
      console.log("📋 Calling toBlob()...");
      const blob = await pdfInstance.toBlob();
      console.log("📋 Got blob, size:", blob.size, "bytes");

      // Convert blob to buffer
      const arrayBuffer = await blob.arrayBuffer();
      const pdfBuffer = Buffer.from(arrayBuffer);

      console.log(
        "📋 PDF generated successfully! Size:",
        pdfBuffer.length,
        "bytes"
      );

      // Send the binary PDF data directly
      res.end(pdfBuffer);
    } catch (pdfError) {
      console.error(
        "❌ PDF generation failed:",
        pdfError instanceof Error ? pdfError.message : String(pdfError)
      );
      return res.status(500).json({
        success: false,
        message: "PDF generation failed",
        error: pdfError instanceof Error ? pdfError.message : String(pdfError),
      });
    }
  } catch (error) {
    // Safe error logging to avoid circular reference issues
    console.error(
      "❌ Request processing error:",
      error instanceof Error ? error.message : String(error)
    );

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PDF Service running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 Templates: http://localhost:${PORT}/templates`);
  console.log(
    `📋 Available templates: modern, corporate, creative, minimal, dummy`
  );
});

export default app;
