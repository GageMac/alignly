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
import {
  RenderRequest,
  RenderResponse,
  TEMPLATES,
  TEMPLATE_INFO,
} from "./types/resume";

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
    availableTemplates: Object.keys(TEMPLATE_INFO),
  });
});

// Get available templates
app.get("/templates", (req, res) => {
  const templates = Object.entries(TEMPLATE_INFO).map(([id, info]) => ({
    id,
    name: info.name,
    description: info.description,
    colorSchemes: info.colorSchemes,
    features: info.features,
  }));

  res.json({ templates });
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
      case TEMPLATES.MODERN:
        pdfDocument = (
          <ModernTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "blue" | "green" | "purple" | "black"}
          />
        );
        break;

      case TEMPLATES.CORPORATE:
        pdfDocument = (
          <CorporateTemplate
            resume={renderRequest.resume}
            colorScheme={
              colorScheme as "navy" | "charcoal" | "burgundy" | "forest"
            }
          />
        );
        break;

      case TEMPLATES.CREATIVE:
        pdfDocument = (
          <CreativeTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "coral" | "teal" | "violet" | "rose"}
          />
        );
        break;

      case TEMPLATES.MINIMAL:
        pdfDocument = (
          <MinimalTemplate
            resume={renderRequest.resume}
            colorScheme={colorScheme as "blue" | "green" | "purple" | "black"}
          />
        );
        break;

      case TEMPLATES.DUMMY:
        pdfDocument = <DummyTemplate />;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: `Unknown template: ${
            renderRequest.template
          }. Available templates: ${Object.keys(TEMPLATE_INFO).join(", ")}`,
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
      const buffer = Buffer.from(arrayBuffer);

      console.log("📋 Converted to buffer, size:", buffer.length, "bytes");

      // Stream the buffer to response
      res.end(buffer);

      console.log("📋 PDF generation completed successfully");
    } catch (error) {
      console.error("📋 Error in PDF generation:", error);
      throw error;
    }
  } catch (error) {
    console.error("📋 Error processing request:", error);
    res.status(500).json({
      success: false,
      message: `Error generating PDF: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`PDF service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Templates: http://localhost:${PORT}/templates`);
});

export default app;
