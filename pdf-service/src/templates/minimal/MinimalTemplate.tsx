import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { StructuredResume } from "../../types/resume";

// Minimal color schemes
const minimalColors = {
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

// Create minimal styles with improved typography hierarchy
const createMinimalStyles = (colorScheme: string = "blue") => {
  const theme =
    minimalColors[colorScheme as keyof typeof minimalColors] ||
    minimalColors.blue;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: theme.white,
      padding: 50,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5, // Improved line height
      color: theme.text,
    },

    // Header with clean design
    header: {
      marginBottom: 36,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.primary,
      borderBottomStyle: "solid",
    },
    name: {
      fontSize: 32, // Increased from 20
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 16,
    },
    contactContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
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

    // Section styling with improved hierarchy
    section: {
      marginBottom: 28, // Increased from 15
    },
    sectionTitle: {
      fontSize: 16, // Increased from 14
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 16, // Increased from 8
      textTransform: "uppercase",
      letterSpacing: 1,
      paddingBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },

    // Summary with improved styling
    summary: {
      fontSize: 11,
      color: theme.text,
      lineHeight: 1.6,
      textAlign: "justify",
      marginBottom: 8,
    },

    // Experience styling with better hierarchy
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
      fontSize: 14, // Increased from 10
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    jobDate: {
      fontSize: 11,
      color: theme.gray,
      fontStyle: "italic",
    },
    companyLocation: {
      fontSize: 12,
      color: theme.primary,
      marginBottom: 10,
      fontWeight: "600",
    },
    responsibilityItem: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 4, // Increased from 2
      paddingLeft: 12, // Increased from 10
      flexDirection: "row",
      alignItems: "flex-start",
    },
    bulletPoint: {
      color: theme.primary,
      marginRight: 8,
      fontSize: 12,
      fontWeight: "bold",
      marginTop: 1,
    },
    responsibilityText: {
      flex: 1,
      lineHeight: 1.5,
    },

    // Education with improved design
    educationItem: {
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dotted",
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
      fontStyle: "italic",
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

    // Skills with clean layout
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillItem: {
      backgroundColor: theme.accent,
      color: theme.primary,
      padding: 6,
      borderRadius: 4,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
      borderWidth: 1,
      borderColor: theme.primary,
      borderStyle: "solid",
    },

    // Projects with minimal design
    projectItem: {
      marginBottom: 16,
      paddingBottom: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "solid",
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
      fontWeight: "600",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.gray,
      marginBottom: 8,
      lineHeight: 1.5,
    },

    // Certifications with minimal styling
    certificationItem: {
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dotted",
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
      fontStyle: "italic",
    },

    // Layout with improved spacing
    twoColumn: {
      flexDirection: "row",
      gap: 32,
    },
    leftColumn: {
      flex: 2,
    },
    rightColumn: {
      flex: 1,
    },

    // Utility styles
    divider: {
      height: 1,
      backgroundColor: theme.accent,
      marginVertical: 10,
    },
  });
};

interface MinimalTemplateProps {
  resume: StructuredResume;
  colorScheme?: "blue" | "green" | "purple" | "black";
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
  resume,
  colorScheme = "blue",
}) => {
  const styles = createMinimalStyles(colorScheme);

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
            {resume.contact.github && (
              <Text style={styles.contactLink}>{resume.contact.github}</Text>
            )}
            {resume.contact.website && (
              <Text style={styles.contactLink}>{resume.contact.website}</Text>
            )}
          </View>
        </View>

        {/* Summary - Only render if present */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience - Only render if present */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.jobDate}>
                      {exp.startDate || ""} - {exp.endDate || "Present"}
                    </Text>
                  )}
                </View>
                <Text style={styles.companyLocation}>
                  {exp.company}
                  {exp.location ? ` • ${exp.location}` : ""}
                </Text>
                {exp.responsibilities &&
                  exp.responsibilities.map((resp, idx) => (
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
        )}

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          <View style={styles.leftColumn}>
            {/* Education - Only render if present */}
            {resume.education && resume.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
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
                    <Text style={styles.institutionName}>
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.educationDetails}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                    {edu.honors && edu.honors.length > 0 && (
                      <Text style={styles.educationDetails}>
                        Honors: {edu.honors.join(", ")}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects - Only render if present */}
            {resume.projects && resume.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {resume.projects.map((project, index) => (
                  <View key={index} style={styles.projectItem}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectTitle}>{project.name}</Text>
                      {(project.startDate || project.endDate) && (
                        <Text style={styles.jobDate}>
                          {project.startDate || ""} -{" "}
                          {project.endDate || "Present"}
                        </Text>
                      )}
                    </View>
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <Text style={styles.projectTech}>
                          {project.technologies.join(" • ")}
                        </Text>
                      )}
                    <Text style={styles.projectDescription}>
                      {project.description}
                    </Text>
                    {project.url && (
                      <Text style={styles.contactLink}>{project.url}</Text>
                    )}
                    {project.github && (
                      <Text style={styles.contactLink}>{project.github}</Text>
                    )}
                    {project.highlights &&
                      project.highlights.map((highlight, idx) => (
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
            {/* Skills - Only render if present */}
            {resume.skills && resume.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {resume.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Certifications - Only render if present */}
            {resume.certifications && resume.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certifications</Text>
                {resume.certifications.map((cert, index) => (
                  <View key={index} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    <Text style={styles.certificationIssuer}>
                      {cert.issuer}
                    </Text>
                    {cert.date && (
                      <Text style={styles.certificationDate}>{cert.date}</Text>
                    )}
                    {cert.expiryDate && (
                      <Text style={styles.certificationDate}>
                        Expires: {cert.expiryDate}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Languages - Only render if present */}
            {resume.languages && resume.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                {resume.languages.map((lang, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.responsibilityText}>{lang}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Awards - Only render if present */}
            {resume.awards && resume.awards.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Awards</Text>
                {resume.awards.map((award, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.responsibilityText}>{award}</Text>
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

export default MinimalTemplate;
