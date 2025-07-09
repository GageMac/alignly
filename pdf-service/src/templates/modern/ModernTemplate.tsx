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

// Define refined color schemes
const colors = {
  blue: {
    primary: "#2563eb",
    secondary: "#3b82f6",
    accent: "#dbeafe",
    text: "#1e293b",
    gray: "#64748b",
    lightGray: "#f8fafc",
    white: "#ffffff",
  },
  green: {
    primary: "#059669",
    secondary: "#10b981",
    accent: "#dcfce7",
    text: "#1e293b",
    gray: "#64748b",
    lightGray: "#f8fafc",
    white: "#ffffff",
  },
  purple: {
    primary: "#7c3aed",
    secondary: "#8b5cf6",
    accent: "#ede9fe",
    text: "#1e293b",
    gray: "#64748b",
    lightGray: "#f8fafc",
    white: "#ffffff",
  },
  black: {
    primary: "#111827",
    secondary: "#374151",
    accent: "#f3f4f6",
    text: "#1e293b",
    gray: "#64748b",
    lightGray: "#f8fafc",
    white: "#ffffff",
  },
};

// Create professional styles
const createStyles = (colorScheme: string = "blue") => {
  const theme = colors[colorScheme as keyof typeof colors] || colors.blue;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: theme.white,
      padding: 48,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5,
      color: theme.text,
    },

    // Header Styles
    header: {
      marginBottom: 32,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.primary,
      borderBottomStyle: "solid",
    },
    name: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 12,
      letterSpacing: -0.5,
    },
    contactContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
    },
    contactItem: {
      fontSize: 11,
      color: theme.gray,
      marginRight: 20,
    },
    contactLink: {
      fontSize: 11,
      color: theme.primary,
      textDecoration: "none",
    },

    // Section Styles
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 12,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      paddingBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },

    // Summary Styles
    summary: {
      fontSize: 11,
      color: theme.text,
      lineHeight: 1.6,
      textAlign: "justify",
      padding: 16,
      backgroundColor: theme.accent,
      borderRadius: 4,
    },

    // Experience Styles
    experienceItem: {
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "solid",
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    jobTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    jobDate: {
      fontSize: 11,
      color: theme.gray,
      backgroundColor: theme.lightGray,
      padding: 4,
      borderRadius: 3,
      textAlign: "center",
      minWidth: 80,
    },
    companyLocation: {
      fontSize: 11,
      color: theme.primary,
      marginBottom: 8,
      fontWeight: "bold",
    },
    responsibilityItem: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 4,
      paddingLeft: 12,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    bulletPoint: {
      color: theme.primary,
      marginRight: 8,
      fontSize: 12,
    },
    responsibilityText: {
      flex: 1,
      lineHeight: 1.4,
    },

    // Skills Styles
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skillItem: {
      backgroundColor: theme.primary,
      color: theme.white,
      padding: 6,
      borderRadius: 12,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
    },
    skillCategory: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 8,
      marginTop: 12,
    },

    // Education Styles
    educationItem: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: theme.lightGray,
      borderRadius: 4,
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    educationTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    educationDate: {
      fontSize: 10,
      color: theme.gray,
      backgroundColor: theme.white,
      padding: 3,
      borderRadius: 2,
    },
    educationDetails: {
      fontSize: 11,
      color: theme.gray,
      marginBottom: 2,
    },
    institutionName: {
      fontSize: 11,
      color: theme.primary,
      fontWeight: "bold",
    },

    // Project Styles
    projectItem: {
      marginBottom: 18,
      padding: 14,
      backgroundColor: theme.lightGray,
      borderRadius: 4,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    projectTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    projectTech: {
      fontSize: 10,
      color: theme.primary,
      marginBottom: 8,
      fontStyle: "italic",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.gray,
      marginBottom: 8,
      lineHeight: 1.4,
    },

    // Certification Styles
    certificationItem: {
      marginBottom: 12,
      padding: 10,
      backgroundColor: theme.accent,
      borderRadius: 4,
    },
    certificationName: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 2,
    },
    certificationIssuer: {
      fontSize: 10,
      color: theme.primary,
      marginBottom: 2,
    },
    certificationDate: {
      fontSize: 9,
      color: theme.gray,
    },

    // Layout Styles
    twoColumn: {
      flexDirection: "row",
      gap: 24,
    },
    leftColumn: {
      flex: 2.2,
    },
    rightColumn: {
      flex: 1,
    },

    // Utility Styles
    divider: {
      height: 1,
      backgroundColor: theme.accent,
      marginVertical: 8,
    },
    accentLine: {
      height: 2,
      backgroundColor: theme.primary,
      marginBottom: 8,
    },
  });
};

interface ModernTemplateProps {
  resume: StructuredResume;
  colorScheme?: "blue" | "green" | "purple" | "black";
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({
  resume,
  colorScheme = "blue",
}) => {
  const styles = createStyles(colorScheme);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <View style={styles.contactContainer}>
            {resume.contact.email && (
              <Text style={styles.contactItem}>{resume.contact.email}</Text>
            )}
            {resume.contact.phone && (
              <Text style={styles.contactItem}>{resume.contact.phone}</Text>
            )}
            {resume.contact.location && (
              <Text style={styles.contactItem}>{resume.contact.location}</Text>
            )}
            {resume.contact.linkedin && (
              <Text style={styles.contactLink}>{resume.contact.linkedin}</Text>
            )}
            {resume.contact.website && (
              <Text style={styles.contactLink}>{resume.contact.website}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <View style={styles.accentLine} />
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          <View style={styles.leftColumn}>
            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.accentLine} />
              {resume.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    {(exp.startDate || exp.endDate) && (
                      <Text style={styles.jobDate}>
                        {exp.startDate || "N/A"} - {exp.endDate || "Present"}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.companyLocation}>
                    {exp.company}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </Text>
                  {exp.responsibilities.map((resp, idx) => (
                    <View key={idx} style={styles.responsibilityItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.responsibilityText}>{resp}</Text>
                    </View>
                  ))}
                  {exp.achievements &&
                    exp.achievements.map((achievement, idx) => (
                      <View key={idx} style={styles.responsibilityItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.responsibilityText}>
                          {achievement}
                        </Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>

            {/* Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                <View style={styles.accentLine} />
                {resume.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      {(project.startDate || project.endDate) && (
                        <Text style={styles.jobDate}>
                          {project.startDate || "N/A"} -{" "}
                          {project.endDate || "Present"}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.projectTech}>
                      {project.technologies.join(" • ")}
                    </Text>
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                    {project.highlights.map((highlight, idx) => (
                      <View key={idx} style={styles.responsibilityItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.responsibilityText}>
                          {highlight}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.accentLine} />
              <View style={styles.skillsContainer}>
                {resume.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <View style={styles.accentLine} />
              {resume.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.educationHeader}>
                    <Text style={styles.educationTitle}>{edu.degree}</Text>
                    {edu.endDate && (
                      <Text style={styles.educationDate}>{edu.endDate}</Text>
                    )}
                  </View>
                  {edu.field && (
                    <Text style={styles.educationDetails}>{edu.field}</Text>
                  )}
                  <Text style={styles.institutionName}>{edu.institution}</Text>
                  {edu.gpa && (
                    <Text style={styles.educationDetails}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              ))}
            </View>

            {/* Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                <View style={styles.accentLine} />
                {resume.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    <Text style={styles.certificationIssuer}>
                      {cert.issuer}
                    </Text>
                    <Text style={styles.certificationDate}>{cert.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {resume.languages && resume.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={styles.accentLine} />
                {resume.languages.map((lang, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.responsibilityText}>{lang}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModernTemplate;
