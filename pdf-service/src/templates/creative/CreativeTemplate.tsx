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

// Creative color schemes
const creativeColors = {
  coral: {
    primary: "#ff6b6b",
    secondary: "#ff8e8e",
    accent: "#fff5f5",
    dark: "#2d3748",
    text: "#2d3748",
    gray: "#718096",
    lightGray: "#f7fafc",
    white: "#ffffff",
  },
  teal: {
    primary: "#14b8a6",
    secondary: "#5eead4",
    accent: "#f0fdfa",
    dark: "#1f2937",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
  violet: {
    primary: "#8b5cf6",
    secondary: "#a78bfa",
    accent: "#f3f0ff",
    dark: "#1f2937",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
  rose: {
    primary: "#f43f5e",
    secondary: "#fb7185",
    accent: "#fff1f2",
    dark: "#1f2937",
    text: "#1f2937",
    gray: "#6b7280",
    lightGray: "#f9fafb",
    white: "#ffffff",
  },
};

// Create creative styles with improved typography hierarchy
const createCreativeStyles = (colorScheme: string = "coral") => {
  const theme =
    creativeColors[colorScheme as keyof typeof creativeColors] ||
    creativeColors.coral;

  return StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: theme.white,
      fontFamily: "Helvetica",
      fontSize: 10,
      lineHeight: 1.5, // Improved line height
      color: theme.text,
    },

    // Header with enhanced gradient-style accent
    headerContainer: {
      backgroundColor: theme.primary,
      marginBottom: 0,
      paddingVertical: 44, // Increased padding
      paddingHorizontal: 50,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    nameSection: {
      flex: 1,
    },
    name: {
      fontSize: 40, // Increased from 36
      fontWeight: "bold",
      color: theme.white,
      marginBottom: 10, // Increased spacing
      fontFamily: "Times-Roman",
    },
    tagline: {
      fontSize: 15, // Increased from 14
      color: theme.white,
      opacity: 0.9,
      fontStyle: "italic",
    },
    contactSection: {
      alignItems: "flex-end",
    },
    contactItem: {
      fontSize: 11, // Increased from 10
      color: theme.white,
      marginBottom: 4, // Increased spacing
      opacity: 0.95,
    },

    // Main content with better spacing
    mainContent: {
      paddingHorizontal: 50,
      paddingTop: 36, // Increased padding
    },

    // Section styling with improved hierarchy
    section: {
      marginBottom: 32, // Increased spacing
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20, // Increased spacing
    },
    sectionIcon: {
      width: 5, // Increased width
      height: 22, // Increased height
      backgroundColor: theme.primary,
      marginRight: 14, // Increased spacing
    },
    sectionTitle: {
      fontSize: 19, // Increased from 18
      fontWeight: "bold",
      color: theme.primary,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      fontFamily: "Times-Roman",
    },

    // Summary with improved styling
    summaryContainer: {
      backgroundColor: theme.accent,
      padding: 24, // Increased padding
      borderRadius: 10,
      borderLeftWidth: 5, // Increased accent
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    summary: {
      fontSize: 12, // Increased from 11
      color: theme.text,
      lineHeight: 1.7, // Improved line height
      fontStyle: "italic",
      textAlign: "justify",
    },

    // Experience cards with better spacing
    experienceCard: {
      backgroundColor: theme.lightGray,
      padding: 24, // Increased padding
      marginBottom: 20, // Increased spacing
      borderRadius: 10,
      borderTopWidth: 4, // Increased accent
      borderTopColor: theme.primary,
      borderTopStyle: "solid",
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10, // Increased spacing
    },
    jobTitle: {
      fontSize: 16, // Increased from 15
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    dateChip: {
      backgroundColor: theme.primary,
      color: theme.white,
      fontSize: 10, // Increased from 9
      paddingHorizontal: 10, // Increased padding
      paddingVertical: 5, // Increased padding
      borderRadius: 14,
      textAlign: "center",
      fontWeight: "bold",
    },
    companyInfo: {
      fontSize: 13, // Increased from 12
      color: theme.primary,
      marginBottom: 14, // Increased spacing
      fontWeight: "bold",
    },
    achievementsList: {
      paddingLeft: 0,
    },
    achievementItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6, // Increased spacing
    },
    bulletPoint: {
      fontSize: 14,
      color: theme.primary,
      marginRight: 12, // Increased spacing
      marginTop: 1, // Align with text
      fontWeight: "bold",
    },
    achievementText: {
      fontSize: 10,
      color: theme.text,
      flex: 1,
      lineHeight: 1.6, // Improved line height
    },

    // Skills section with enhanced design
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10, // Increased gap
    },
    skillTag: {
      backgroundColor: theme.primary,
      color: theme.white,
      fontSize: 9,
      paddingHorizontal: 12, // Increased padding
      paddingVertical: 6, // Increased padding
      borderRadius: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    skillCategory: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.dark,
      marginBottom: 10,
      marginTop: 16,
    },

    // Education cards with improved spacing
    educationCard: {
      backgroundColor: theme.accent,
      padding: 20, // Increased padding
      marginBottom: 18, // Increased spacing
      borderRadius: 10,
      borderLeftWidth: 4, // Increased accent
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    educationTitle: {
      fontSize: 15, // Increased from 14
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    educationDate: {
      fontSize: 10,
      color: theme.gray,
      backgroundColor: theme.white,
      padding: 4,
      borderRadius: 4,
    },
    educationDetails: {
      fontSize: 11,
      color: theme.text,
      marginBottom: 3,
    },
    institutionName: {
      fontSize: 12, // Increased from 11
      color: theme.primary,
      fontWeight: "bold",
    },

    // Projects section with enhanced design
    projectCard: {
      backgroundColor: theme.lightGray,
      padding: 22, // Increased padding
      marginBottom: 20, // Increased spacing
      borderRadius: 10,
      borderTopWidth: 4, // Increased accent
      borderTopColor: theme.primary,
      borderTopStyle: "solid",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    projectTitle: {
      fontSize: 15, // Increased from 14
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    projectTech: {
      fontSize: 10,
      color: theme.primary,
      marginBottom: 12,
      fontWeight: "600",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 12,
      lineHeight: 1.6,
      textAlign: "justify",
    },

    // Certifications with improved styling
    certificationCard: {
      backgroundColor: theme.accent,
      padding: 18, // Increased padding
      marginBottom: 16, // Increased spacing
      borderRadius: 10,
      borderLeftWidth: 4, // Increased accent
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    certificationName: {
      fontSize: 13, // Increased from 12
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
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
      fontStyle: "italic",
    },

    // Layout with improved spacing
    twoColumn: {
      flexDirection: "row",
      gap: 40, // Increased gap
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
    pageBreak: {
      pageBreakBefore: "always",
    },
  });
};

interface CreativeTemplateProps {
  resume: StructuredResume;
  colorScheme?: "coral" | "teal" | "violet" | "rose";
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  resume,
  colorScheme = "coral",
}) => {
  const styles = createCreativeStyles(colorScheme);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.nameSection}>
              <Text style={styles.name}>{resume.contact.name}</Text>
              {resume.summary && (
                <Text style={styles.tagline}>
                  {resume.summary.substring(0, 100)}
                  {resume.summary.length > 100 ? "..." : ""}
                </Text>
              )}
            </View>
            <View style={styles.contactSection}>
              {resume.contact.email && (
                <Text style={styles.contactItem}>{resume.contact.email}</Text>
              )}
              {resume.contact.phone && (
                <Text style={styles.contactItem}>{resume.contact.phone}</Text>
              )}
              {resume.contact.location && (
                <Text style={styles.contactItem}>
                  {resume.contact.location}
                </Text>
              )}
              {resume.contact.linkedin && (
                <Text style={styles.contactItem}>
                  {resume.contact.linkedin}
                </Text>
              )}
              {resume.contact.github && (
                <Text style={styles.contactItem}>{resume.contact.github}</Text>
              )}
              {resume.contact.website && (
                <Text style={styles.contactItem}>{resume.contact.website}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Summary - Only render if present */}
          {resume.summary && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Summary</Text>
              </View>
              <View style={styles.summaryContainer}>
                <Text style={styles.summary}>{resume.summary}</Text>
              </View>
            </View>
          )}

          {/* Experience - Only render if present */}
          {resume.experience && resume.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Experience</Text>
              </View>
              {resume.experience.map((exp, index) => (
                <View key={index} style={styles.experienceCard}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.jobTitle}>{exp.position}</Text>
                    {(exp.startDate || exp.endDate) && (
                      <Text style={styles.dateChip}>
                        {exp.startDate || ""} - {exp.endDate || "Present"}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.companyInfo}>
                    {exp.company}
                    {exp.location ? ` • ${exp.location}` : ""}
                  </Text>
                  <View style={styles.achievementsList}>
                    {exp.responsibilities &&
                      exp.responsibilities.map((resp, idx) => (
                        <View key={idx} style={styles.achievementItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.achievementText}>{resp}</Text>
                        </View>
                      ))}
                    {exp.achievements &&
                      exp.achievements.map((achievement, idx) => (
                        <View key={idx} style={styles.achievementItem}>
                          <Text style={styles.bulletPoint}>•</Text>
                          <Text style={styles.achievementText}>
                            {achievement}
                          </Text>
                        </View>
                      ))}
                  </View>
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
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Education</Text>
                  </View>
                  {resume.education.map((edu, index) => (
                    <View key={index} style={styles.educationCard}>
                      <View style={styles.educationHeader}>
                        <Text style={styles.educationTitle}>{edu.degree}</Text>
                        {edu.endDate && (
                          <Text style={styles.educationDate}>
                            {edu.endDate}
                          </Text>
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
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Projects</Text>
                  </View>
                  {resume.projects.map((project, index) => (
                    <View key={index} style={styles.projectCard}>
                      <View style={styles.projectHeader}>
                        <Text style={styles.projectTitle}>{project.name}</Text>
                        {(project.startDate || project.endDate) && (
                          <Text style={styles.dateChip}>
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
                          <View key={idx} style={styles.achievementItem}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.achievementText}>
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
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Skills</Text>
                  </View>
                  <View style={styles.skillsGrid}>
                    {resume.skills.map((skill, index) => (
                      <Text key={index} style={styles.skillTag}>
                        {skill.name}
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {/* Certifications - Only render if present */}
              {resume.certifications && resume.certifications.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>
                  {resume.certifications.map((cert, index) => (
                    <View key={index} style={styles.certificationCard}>
                      <Text style={styles.certificationName}>{cert.name}</Text>
                      <Text style={styles.certificationIssuer}>
                        {cert.issuer}
                      </Text>
                      {cert.date && (
                        <Text style={styles.certificationDate}>
                          {cert.date}
                        </Text>
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
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  {resume.languages.map((lang, index) => (
                    <View key={index} style={styles.achievementItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.achievementText}>{lang}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Awards - Only render if present */}
              {resume.awards && resume.awards.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Awards</Text>
                  </View>
                  {resume.awards.map((award, index) => (
                    <View key={index} style={styles.achievementItem}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.achievementText}>{award}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CreativeTemplate;
