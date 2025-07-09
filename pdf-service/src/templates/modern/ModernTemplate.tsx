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

// Create professional styles with improved typography hierarchy
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

    // Header Styles - Enhanced typography
    header: {
      marginBottom: 36,
      paddingBottom: 24,
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
      borderBottomStyle: "solid",
    },
    name: {
      fontSize: 36, // Increased from 32
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 16, // Increased spacing
      letterSpacing: -0.5,
    },
    contactContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20, // Increased gap
    },
    contactItem: {
      fontSize: 11,
      color: theme.gray,
      marginRight: 24, // Increased spacing
    },
    contactLink: {
      fontSize: 11,
      color: theme.primary,
      textDecoration: "none",
    },

    // Section Styles - Enhanced hierarchy
    section: {
      marginBottom: 32, // Increased from 24
    },
    sectionTitle: {
      fontSize: 18, // Increased from 16
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 16, // Increased from 12
      textTransform: "uppercase",
      letterSpacing: 1.5,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },

    // Summary Styles - Improved spacing
    summary: {
      fontSize: 11,
      color: theme.text,
      lineHeight: 1.7, // Increased line height
      textAlign: "justify",
      padding: 20, // Increased padding
      backgroundColor: theme.accent,
      borderRadius: 6,
      marginBottom: 8,
    },

    // Experience Styles - Better spacing and hierarchy
    experienceItem: {
      marginBottom: 24,
      paddingBottom: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "solid",
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: 16, // Increased from 14
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    jobDate: {
      fontSize: 11,
      color: theme.gray,
      backgroundColor: theme.lightGray,
      padding: 6, // Increased padding
      borderRadius: 4,
      textAlign: "center",
      minWidth: 90,
    },
    companyLocation: {
      fontSize: 12, // Increased from 11
      color: theme.primary,
      marginBottom: 12, // Increased spacing
      fontWeight: "600",
    },
    responsibilityItem: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 6, // Increased spacing
      paddingLeft: 16, // Increased indentation
      flexDirection: "row",
      alignItems: "flex-start",
    },
    bulletPoint: {
      color: theme.primary,
      marginRight: 10, // Increased spacing
      fontSize: 12,
      fontWeight: "bold",
      marginTop: 1, // Align with text
    },
    responsibilityText: {
      flex: 1,
      lineHeight: 1.6, // Improved line height
    },

    // Skills Styles - Enhanced layout
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8, // Increased gap
    },
    skillItem: {
      backgroundColor: theme.primary,
      color: theme.white,
      padding: 8, // Increased padding
      borderRadius: 14,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
      minWidth: 60,
    },
    skillCategory: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 10,
      marginTop: 16,
    },

    // Education Styles - Improved spacing
    educationItem: {
      marginBottom: 20, // Increased from 16
      padding: 16, // Increased padding
      backgroundColor: theme.lightGray,
      borderRadius: 6,
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    educationTitle: {
      fontSize: 14, // Increased from 13
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    educationDate: {
      fontSize: 10,
      color: theme.gray,
      backgroundColor: theme.white,
      padding: 4,
      borderRadius: 3,
    },
    educationDetails: {
      fontSize: 11,
      color: theme.gray,
      marginBottom: 3,
    },
    institutionName: {
      fontSize: 12, // Increased from 11
      color: theme.primary,
      fontWeight: "bold",
    },

    // Project Styles - Enhanced design
    projectItem: {
      marginBottom: 24, // Increased from 18
      padding: 18, // Increased padding
      backgroundColor: theme.lightGray,
      borderRadius: 6,
      borderLeftWidth: 4, // Increased accent
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    projectTitle: {
      fontSize: 14, // Increased from 13
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
    },
    projectTech: {
      fontSize: 10,
      color: theme.primary,
      marginBottom: 10,
      fontWeight: "600",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.gray,
      marginBottom: 10,
      lineHeight: 1.6,
    },

    // Certification Styles - Improved spacing
    certificationItem: {
      marginBottom: 16, // Increased from 12
      padding: 14, // Increased padding
      backgroundColor: theme.accent,
      borderRadius: 6,
    },
    certificationName: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 4,
    },
    certificationIssuer: {
      fontSize: 11, // Increased from 10
      color: theme.primary,
      marginBottom: 4,
    },
    certificationDate: {
      fontSize: 10, // Increased from 9
      color: theme.gray,
    },

    // Layout Styles - Improved column spacing
    twoColumn: {
      flexDirection: "row",
      gap: 32, // Increased gap
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
      marginVertical: 12,
    },
    accentLine: {
      height: 2,
      backgroundColor: theme.primary,
      marginBottom: 12,
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
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <View style={styles.accentLine} />
            <Text style={styles.summary}>{resume.summary}</Text>
          </View>
        )}

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          <View style={styles.leftColumn}>
            {/* Experience - Only render if present */}
            {resume.experience && resume.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                <View style={styles.accentLine} />
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

            {/* Projects - Only render if present */}
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
                <View style={styles.accentLine} />
                <View style={styles.skillsContainer}>
                  {resume.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillItem}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Education - Only render if present */}
            {resume.education && resume.education.length > 0 && (
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

            {/* Certifications - Only render if present */}
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
                <View style={styles.accentLine} />
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
                <View style={styles.accentLine} />
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

export default ModernTemplate;
