import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const colors = {
  primary: "#1e3a5f",
  gold: "#b8860b",
  text: "#333333",
  light: "#f5f5f0",
  border: "#1e3a5f",
};

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: colors.light,
    fontFamily: "Helvetica",
  },
  borderOuter: {
    flex: 1,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 20,
  },
  borderInner: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.gold,
    borderRadius: 2,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  seal: {
    position: "absolute",
    top: 80,
    right: 80,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.gold,
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(15deg)",
  },
  sealText: {
    fontSize: 9,
    color: colors.gold,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 1.3,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 11,
    color: colors.gold,
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  divider: {
    width: 200,
    height: 1.5,
    backgroundColor: colors.gold,
    marginBottom: 30,
  },
  certifies: {
    fontSize: 13,
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  completed: {
    fontSize: 13,
    color: colors.text,
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 1.6,
  },
  courseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 30,
  },
  detailBox: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 9,
    color: "#888",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  detailValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 60,
    left: 70,
    right: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 12,
  },
  footerText: {
    fontSize: 8,
    color: "#999",
  },
  certId: {
    fontSize: 8,
    color: "#999",
    fontFamily: "Helvetica",
  },
});

export default function CertificatePDF({
  name,
  email,
  score,
  total,
  percentage,
  date,
  certId,
}: {
  name: string;
  email: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  certId: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.borderOuter}>
          <View style={styles.borderInner}>
            {/* Seal stamp */}
            <View style={styles.seal}>
              <Text style={styles.sealText}>CERTIFIED{"\n"}CODENEST</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>Certificate</Text>
            <Text style={styles.subtitle}>of Completion</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body */}
            <Text style={styles.certifies}>This certifies that</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.completed}>
              has successfully completed the
            </Text>
            <Text style={styles.courseName}>
              CodeNest Certificate Exam
            </Text>

            {/* Score details */}
            <View style={styles.detailsRow}>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Score</Text>
                <Text style={styles.detailValue}>
                  {score}/{total}
                </Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Percentage</Text>
                <Text style={styles.detailValue}>{percentage}%</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{date}</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                {email}
              </Text>
              <Text style={styles.certId}>ID: {certId}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
