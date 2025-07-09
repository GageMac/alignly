import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { StructuredResume } from "../../types/resume";

// Corporate color schemes
const corporateColors = {
  navy: {
    primary: "#1e3a8a",
    secondary: "#3b82f6",
    accent: "#e0e7ff",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
  charcoal: {
    primary: "#374151",
    secondary: "#6b7280",
    accent: "#f3f4f6",
    text: "#111827",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
  burgundy: {
    primary: "#7f1d1d",
    secondary: "#dc2626",
    accent: "#fee2e2",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
  forest: {
    primary: "#14532d",
    secondary: "#16a34a",
    accent: "#dcfce7",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
};

// Create corporate styles
const createCorporateStyles = (colorScheme: string = "navy") => {
  const theme =
    corporateColors[colorScheme as keyof typeof corporateColors] ||
    corporateColors.navy;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: theme.white,
      padding: 50,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.4,
      color: theme.text,
    },

    // Header with classic styling
    header: {
      marginBottom: 40,
      paddingBottom: 25,
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
      borderBottomStyle: "solid",
      textAlign: "center",
    },
    name: {
      fontSize: 36,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 8,
      fontFamily: "Times-Roman",
      letterSpacing: 1,
    },
    title: {
      fontSize: 14,
      color: theme.gray,
      marginBottom: 15,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    contactBar: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 20,
    },
    contactItem: {
      fontSize: 11,
      color: theme.text,
    },
    contactSeparator: {
      fontSize: 11,
      color: theme.gray,
    },

    // Section styling
    section: {
      marginBottom: 28,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 15,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontFamily: "Times-Roman",
      textAlign: "center",
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },

    // Summary with classic styling
    summary: {
      fontSize: 11,
      color: theme.text,
      lineHeight: 1.7,
      textAlign: "justify",
      fontStyle: "italic",
      paddingHorizontal: 20,
    },

    // Experience section
    experienceItem: {
      marginBottom: 24,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dashed",
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      paddingBottom: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
    },
    jobDate: {
      fontSize: 11,
      color: theme.gray,
      fontStyle: "italic",
    },
    companyInfo: {
      fontSize: 12,
      color: theme.secondary,
      marginBottom: 10,
      fontWeight: "bold",
    },
    responsibilityItem: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 5,
      paddingLeft: 15,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    bulletPoint: {
      color: theme.primary,
      marginRight: 10,
      fontSize: 14,
      fontWeight: "bold",
    },
    responsibilityText: {
      flex: 1,
      lineHeight: 1.5,
      textAlign: "justify",
    },

    // Education section
    educationItem: {
      marginBottom: 18,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dotted",
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    educationTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
    },
    educationDate: {
      fontSize: 11,
      color: theme.gray,
      fontStyle: "italic",
    },
    educationDetails: {
      fontSize: 11,
      color: theme.text,
      marginBottom: 3,
    },
    institutionName: {
      fontSize: 12,
      color: theme.secondary,
      fontWeight: "bold",
    },

    // Skills section
    skillsContainer: {
      flexDirection: "column",
      gap: 12,
    },
    skillCategory: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    skillItems: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillItem: {
      fontSize: 10,
      color: theme.text,
      backgroundColor: theme.accent,
      padding: 5,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: theme.primary,
      borderStyle: "solid",
    },

    // Projects section
    projectItem: {
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "solid",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    projectTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
    },
    projectTech: {
      fontSize: 10,
      color: theme.secondary,
      marginBottom: 8,
      fontStyle: "italic",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 8,
      lineHeight: 1.5,
      textAlign: "justify",
    },

    // Certifications
    certificationItem: {
      marginBottom: 15,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dotted",
    },
    certificationName: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 4,
    },
    certificationDetails: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 2,
    },
    certificationIssuer: {
      fontSize: 10,
      color: theme.secondary,
      fontStyle: "italic",
    },

    // Layout
    mainContent: {
      flexDirection: "column",
    },

    // Utilities
    divider: {
      height: 2,
      backgroundColor: theme.primary,
      marginVertical: 15,
    },
    centerText: {
      textAlign: "center",
    },
  });
};

interface CorporateTemplateProps {
  resume: StructuredResume;
  colorScheme?: "navy" | "charcoal" | "burgundy" | "forest";
}

const CorporateTemplate: React.FC<CorporateTemplateProps> = ({
  resume,
  colorScheme = "navy",
}) => {
  const styles = createCorporateStyles(colorScheme);

  // Group skills by category if available
  const groupedSkills = resume.skills.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof resume.skills>);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <Text style={styles.title}>Professional Resume</Text>
          <View style={styles.contactBar}>
            {resume.contact.email && (
              <>
                <Text style={styles.contactItem}>{resume.contact.email}</Text>
                <Text style={styles.contactSeparator}>•</Text>
              </>
            )}
            {resume.contact.phone && (
              <>
                <Text style={styles.contactItem}>{resume.contact.phone}</Text>
                <Text style={styles.contactSeparator}>•</Text>
              </>
            )}
            {resume.contact.location && (
              <Text style={styles.contactItem}>{resume.contact.location}</Text>
            )}
            {resume.contact.linkedin && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>
                  {resume.contact.linkedin}
                </Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Summary */}
          {resume.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resume.summary}</Text>
            </View>
          )}

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resume.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobDate}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>
                  {exp.company} • {exp.location}
                </Text>
                {exp.responsibilities.map((resp, idx) => (
                  <View key={idx} style={styles.responsibilityItem}>
                    <Text style={styles.bulletPoint}>▪</Text>
                    <Text style={styles.responsibilityText}>{resp}</Text>
                  </View>
                ))}
                {exp.achievements &&
                  exp.achievements.map((achievement, idx) => (
                    <View key={idx} style={styles.responsibilityItem}>
                      <Text style={styles.bulletPoint}>▪</Text>
                      <Text style={styles.responsibilityText}>
                        {achievement}
                      </Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.educationTitle}>{edu.degree}</Text>
                  <Text style={styles.educationDate}>{edu.endDate}</Text>
                </View>
                <Text style={styles.educationDetails}>{edu.field}</Text>
                <Text style={styles.institutionName}>{edu.institution}</Text>
                {edu.gpa && (
                  <Text style={styles.educationDetails}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <View key={category}>
                  <Text style={styles.skillCategory}>{category}</Text>
                  <View style={styles.skillItems}>
                    {skills.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Projects */}
          {resume.projects && resume.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notable Projects</Text>
              {resume.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <View style={styles.projectHeader}>
                    <Text style={styles.projectTitle}>{project.name}</Text>
                    <Text style={styles.jobDate}>
                      {project.startDate} - {project.endDate}
                    </Text>
                  </View>
                  <Text style={styles.projectTech}>
                    Technologies: {project.technologies.join(", ")}
                  </Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>
                  {project.highlights.map((highlight, idx) => (
                    <View key={idx} style={styles.responsibilityItem}>
                      <Text style={styles.bulletPoint}>▪</Text>
                      <Text style={styles.responsibilityText}>{highlight}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {resume.certifications.map((cert, index) => (
                <View key={index} style={styles.certificationItem}>
                  <Text style={styles.certificationName}>{cert.name}</Text>
                  <Text style={styles.certificationDetails}>
                    Issued: {cert.date}
                  </Text>
                  <Text style={styles.certificationIssuer}>{cert.issuer}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default CorporateTemplate;
