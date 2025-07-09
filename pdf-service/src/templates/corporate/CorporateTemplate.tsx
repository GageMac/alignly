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

// Create corporate styles with improved typography hierarchy
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
      lineHeight: 1.5, // Improved line height
      color: theme.text,
    },

    // Header with enhanced classic styling
    header: {
      marginBottom: 44, // Increased spacing
      paddingBottom: 28,
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
      borderBottomStyle: "solid",
      textAlign: "center",
    },
    name: {
      fontSize: 38, // Increased from 36
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 10,
      fontFamily: "Times-Roman",
      letterSpacing: 1,
    },
    title: {
      fontSize: 15, // Increased from 14
      color: theme.gray,
      marginBottom: 18, // Increased spacing
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    contactBar: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 24, // Increased gap
    },
    contactItem: {
      fontSize: 11,
      color: theme.text,
    },
    contactSeparator: {
      fontSize: 11,
      color: theme.gray,
    },

    // Section styling with improved hierarchy
    section: {
      marginBottom: 32, // Increased spacing
    },
    sectionTitle: {
      fontSize: 18, // Increased from 16
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 18, // Increased spacing
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontFamily: "Times-Roman",
      textAlign: "center",
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },

    // Summary with improved spacing
    summary: {
      fontSize: 12, // Increased from 11
      color: theme.text,
      lineHeight: 1.8, // Improved line height
      textAlign: "justify",
      fontStyle: "italic",
      paddingHorizontal: 24, // Increased padding
      marginBottom: 8,
    },

    // Experience section with better spacing
    experienceItem: {
      marginBottom: 28, // Increased spacing
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dashed",
    },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10, // Increased spacing
      paddingBottom: 6,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },
    jobTitle: {
      fontSize: 16, // Increased from 14
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
    },
    jobDate: {
      fontSize: 11,
      color: theme.gray,
      fontStyle: "italic",
      backgroundColor: theme.lightGray,
      padding: 6,
      borderRadius: 4,
    },
    companyInfo: {
      fontSize: 13, // Increased from 12
      color: theme.secondary,
      marginBottom: 12, // Increased spacing
      fontWeight: "bold",
    },
    responsibilityItem: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 6, // Increased spacing
      paddingLeft: 18, // Increased indentation
      flexDirection: "row",
      alignItems: "flex-start",
    },
    bulletPoint: {
      color: theme.primary,
      marginRight: 12, // Increased spacing
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 1, // Align with text
    },
    responsibilityText: {
      flex: 1,
      lineHeight: 1.6, // Improved line height
      textAlign: "justify",
    },

    // Education section with improved spacing
    educationItem: {
      marginBottom: 22, // Increased spacing
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGray,
      borderBottomStyle: "dotted",
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.accent,
      borderBottomStyle: "solid",
    },
    educationTitle: {
      fontSize: 15, // Increased from 14
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
    },
    educationDate: {
      fontSize: 11,
      color: theme.gray,
      fontStyle: "italic",
      backgroundColor: theme.lightGray,
      padding: 4,
      borderRadius: 3,
    },
    educationDetails: {
      fontSize: 11,
      color: theme.text,
      marginBottom: 4,
    },
    institutionName: {
      fontSize: 12, // Increased from 11
      color: theme.secondary,
      fontWeight: "bold",
    },

    // Skills section with enhanced layout
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8, // Increased gap
      justifyContent: "center",
    },
    skillItem: {
      backgroundColor: theme.primary,
      color: theme.white,
      padding: 8, // Increased padding
      borderRadius: 6,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
      minWidth: 65,
    },
    skillCategory: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 10,
      marginTop: 16,
      textAlign: "center",
    },

    // Projects section with improved design
    projectItem: {
      marginBottom: 26, // Increased spacing
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
      color: theme.primary,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    projectTech: {
      fontSize: 10,
      color: theme.secondary,
      marginBottom: 10,
      fontWeight: "600",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 10,
      lineHeight: 1.6,
      textAlign: "justify",
    },

    // Certifications section with improved spacing
    certificationItem: {
      marginBottom: 18, // Increased spacing
      padding: 16, // Increased padding
      backgroundColor: theme.accent,
      borderRadius: 6,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    certificationName: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
      marginBottom: 4,
    },
    certificationIssuer: {
      fontSize: 11, // Increased from 10
      color: theme.text,
      marginBottom: 4,
    },
    certificationDate: {
      fontSize: 10, // Increased from 9
      color: theme.gray,
      fontStyle: "italic",
    },

    // Layout styles with improved spacing
    twoColumn: {
      flexDirection: "row",
      gap: 36, // Increased gap
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
      marginVertical: 12,
    },
    accentLine: {
      height: 2,
      backgroundColor: theme.primary,
      marginBottom: 12,
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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <View style={styles.contactBar}>
            {resume.contact.email && (
              <Text style={styles.contactItem}>{resume.contact.email}</Text>
            )}
            {resume.contact.phone && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>{resume.contact.phone}</Text>
              </>
            )}
            {resume.contact.location && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>
                  {resume.contact.location}
                </Text>
              </>
            )}
            {resume.contact.linkedin && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>
                  {resume.contact.linkedin}
                </Text>
              </>
            )}
            {resume.contact.github && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>{resume.contact.github}</Text>
              </>
            )}
            {resume.contact.website && (
              <>
                <Text style={styles.contactSeparator}>•</Text>
                <Text style={styles.contactItem}>{resume.contact.website}</Text>
              </>
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

        {/* Experience - Only render if present */}
        {resume.experience && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                <Text style={styles.companyInfo}>
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
                      <Text style={styles.contactItem}>{project.url}</Text>
                    )}
                    {project.github && (
                      <Text style={styles.contactItem}>{project.github}</Text>
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

export default CorporateTemplate;
