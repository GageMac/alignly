import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { StructuredResume } from "../../types/resume";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    marginBottom: 5,
  },
  bulletPoint: {
    marginBottom: 2,
    paddingLeft: 10,
  },
});

interface MinimalTemplateProps {
  resume: StructuredResume;
  colorScheme?: "blue" | "green" | "purple" | "black";
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
  resume,
  colorScheme = "blue",
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <Text style={styles.text}>{resume.contact.email}</Text>
          <Text style={styles.text}>{resume.contact.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{resume.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.map((exp, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.text}>
                {exp.position} at {exp.company}
              </Text>
              <Text style={styles.text}>
                {exp.startDate} - {exp.endDate}
              </Text>
              {exp.responsibilities.map((resp, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {resp}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((edu, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.text}>
                {edu.degree} in {edu.field}
              </Text>
              <Text style={styles.text}>{edu.institution}</Text>
              <Text style={styles.text}>
                {edu.startDate} - {edu.endDate}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {resume.skills.map((skill, index) => (
            <Text key={index} style={styles.text}>
              • {skill.name}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default MinimalTemplate;
