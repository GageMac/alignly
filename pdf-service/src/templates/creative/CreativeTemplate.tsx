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

// Create creative styles
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
      lineHeight: 1.4,
      color: theme.text,
    },

    // Header with gradient-style accent
    headerContainer: {
      backgroundColor: theme.primary,
      marginBottom: 0,
      paddingVertical: 40,
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
      fontSize: 36,
      fontWeight: "bold",
      color: theme.white,
      marginBottom: 8,
      fontFamily: "Times-Roman",
    },
    tagline: {
      fontSize: 14,
      color: theme.white,
      opacity: 0.9,
      fontStyle: "italic",
    },
    contactSection: {
      alignItems: "flex-end",
    },
    contactItem: {
      fontSize: 10,
      color: theme.white,
      marginBottom: 3,
      opacity: 0.95,
    },

    // Main content
    mainContent: {
      paddingHorizontal: 50,
      paddingTop: 30,
    },

    // Section styling
    section: {
      marginBottom: 28,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
    },
    sectionIcon: {
      width: 4,
      height: 20,
      backgroundColor: theme.primary,
      marginRight: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primary,
      textTransform: "uppercase",
      letterSpacing: 1,
      fontFamily: "Times-Roman",
    },

    // Summary with elegant styling
    summaryContainer: {
      backgroundColor: theme.accent,
      padding: 20,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.primary,
      borderLeftStyle: "solid",
    },
    summary: {
      fontSize: 11,
      color: theme.text,
      lineHeight: 1.6,
      fontStyle: "italic",
      textAlign: "justify",
    },

    // Experience cards
    experienceCard: {
      backgroundColor: theme.lightGray,
      padding: 20,
      marginBottom: 16,
      borderRadius: 8,
      borderTopWidth: 3,
      borderTopColor: theme.primary,
      borderTopStyle: "solid",
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    dateChip: {
      backgroundColor: theme.primary,
      color: theme.white,
      fontSize: 9,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      textAlign: "center",
      fontWeight: "bold",
    },
    companyInfo: {
      fontSize: 12,
      color: theme.primary,
      marginBottom: 12,
      fontWeight: "bold",
    },
    achievementsList: {
      paddingLeft: 0,
    },
    achievementItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    achievementBullet: {
      width: 6,
      height: 6,
      backgroundColor: theme.primary,
      borderRadius: 3,
      marginRight: 10,
      marginTop: 6,
    },
    achievementText: {
      fontSize: 10,
      color: theme.text,
      flex: 1,
      lineHeight: 1.5,
    },

    // Skills with creative layout
    skillsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 8,
    },
    skillChip: {
      backgroundColor: theme.primary,
      color: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
    },
    skillChipSecondary: {
      backgroundColor: theme.secondary,
      color: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      fontSize: 9,
      fontWeight: "bold",
      textAlign: "center",
    },

    // Education with elegant design
    educationCard: {
      backgroundColor: theme.accent,
      padding: 16,
      marginBottom: 12,
      borderRadius: 6,
      borderRightWidth: 4,
      borderRightColor: theme.secondary,
      borderRightStyle: "solid",
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    educationTitle: {
      fontSize: 13,
      fontWeight: "bold",
      color: theme.dark,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    educationDate: {
      fontSize: 10,
      color: theme.gray,
      backgroundColor: theme.white,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 8,
    },
    educationDetails: {
      fontSize: 10,
      color: theme.text,
      marginBottom: 2,
    },
    institutionName: {
      fontSize: 11,
      color: theme.primary,
      fontWeight: "bold",
    },

    // Projects with creative cards
    projectCard: {
      backgroundColor: theme.white,
      padding: 18,
      marginBottom: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: theme.accent,
      borderStyle: "solid",
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    projectTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.primary,
      fontFamily: "Times-Roman",
      flex: 1,
    },
    projectTechContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginBottom: 10,
    },
    projectTechChip: {
      backgroundColor: theme.accent,
      color: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
      fontSize: 8,
      fontWeight: "bold",
    },
    projectDescription: {
      fontSize: 10,
      color: theme.gray,
      marginBottom: 8,
      lineHeight: 1.4,
      fontStyle: "italic",
    },

    // Certifications with badges
    certificationContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    certificationBadge: {
      backgroundColor: theme.primary,
      color: theme.white,
      padding: 12,
      borderRadius: 8,
      flex: 1,
      minWidth: 120,
    },
    certificationName: {
      fontSize: 11,
      fontWeight: "bold",
      marginBottom: 4,
    },
    certificationIssuer: {
      fontSize: 9,
      opacity: 0.9,
      marginBottom: 2,
    },
    certificationDate: {
      fontSize: 8,
      opacity: 0.8,
    },

    // Layout utilities
    twoColumn: {
      flexDirection: "row",
      gap: 24,
    },
    leftColumn: {
      flex: 2,
    },
    rightColumn: {
      flex: 1,
    },

    // Decorative elements
    decorativeLine: {
      height: 2,
      backgroundColor: theme.secondary,
      marginVertical: 15,
      borderRadius: 1,
    },
    accentBox: {
      backgroundColor: theme.accent,
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
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
              <Text style={styles.tagline}>Creative Professional</Text>
            </View>
            <View style={styles.contactSection}>
              <Text style={styles.contactItem}>{resume.contact.email}</Text>
              <Text style={styles.contactItem}>{resume.contact.phone}</Text>
              <Text style={styles.contactItem}>{resume.contact.location}</Text>
              {resume.contact.linkedin && (
                <Text style={styles.contactItem}>
                  {resume.contact.linkedin}
                </Text>
              )}
              {resume.contact.website && (
                <Text style={styles.contactItem}>{resume.contact.website}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Summary */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            <View style={styles.summaryContainer}>
              <Text style={styles.summary}>{resume.summary}</Text>
            </View>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Experience</Text>
            </View>
            {resume.experience.map((exp, index) => (
              <View key={index} style={styles.experienceCard}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.dateChip}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.companyInfo}>
                  {exp.company} • {exp.location}
                </Text>
                <View style={styles.achievementsList}>
                  {exp.responsibilities.map((resp, idx) => (
                    <View key={idx} style={styles.achievementItem}>
                      <View style={styles.achievementBullet} />
                      <Text style={styles.achievementText}>{resp}</Text>
                    </View>
                  ))}
                  {exp.achievements &&
                    exp.achievements.map((achievement, idx) => (
                      <View key={idx} style={styles.achievementItem}>
                        <View style={styles.achievementBullet} />
                        <Text style={styles.achievementText}>
                          {achievement}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>

          {/* Two Column Layout */}
          <View style={styles.twoColumn}>
            <View style={styles.leftColumn}>
              {/* Projects */}
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
                        <Text style={styles.dateChip}>
                          {project.startDate} - {project.endDate}
                        </Text>
                      </View>
                      <View style={styles.projectTechContainer}>
                        {project.technologies.map((tech, idx) => (
                          <Text key={idx} style={styles.projectTechChip}>
                            {tech}
                          </Text>
                        ))}
                      </View>
                      <Text style={styles.projectDescription}>
                        {project.description}
                      </Text>
                      <View style={styles.achievementsList}>
                        {project.highlights.map((highlight, idx) => (
                          <View key={idx} style={styles.achievementItem}>
                            <View style={styles.achievementBullet} />
                            <Text style={styles.achievementText}>
                              {highlight}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.rightColumn}>
              {/* Skills */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Skills</Text>
                </View>
                <View style={styles.skillsGrid}>
                  {resume.skills.map((skill, index) => (
                    <Text
                      key={index}
                      style={
                        index % 2 === 0
                          ? styles.skillChip
                          : styles.skillChipSecondary
                      }
                    >
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Education */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionIcon} />
                  <Text style={styles.sectionTitle}>Education</Text>
                </View>
                {resume.education.map((edu, index) => (
                  <View key={index} style={styles.educationCard}>
                    <View style={styles.educationHeader}>
                      <Text style={styles.educationTitle}>{edu.degree}</Text>
                      <Text style={styles.educationDate}>{edu.endDate}</Text>
                    </View>
                    <Text style={styles.educationDetails}>{edu.field}</Text>
                    <Text style={styles.institutionName}>
                      {edu.institution}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.educationDetails}>
                        GPA: {edu.gpa}
                      </Text>
                    )}
                  </View>
                ))}
              </View>

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>
                  <View style={styles.certificationContainer}>
                    {resume.certifications.map((cert, index) => (
                      <View key={index} style={styles.certificationBadge}>
                        <Text style={styles.certificationName}>
                          {cert.name}
                        </Text>
                        <Text style={styles.certificationIssuer}>
                          {cert.issuer}
                        </Text>
                        <Text style={styles.certificationDate}>
                          {cert.date}
                        </Text>
                      </View>
                    ))}
                  </View>
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
