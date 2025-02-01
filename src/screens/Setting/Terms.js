import React from 'react';
import { ScrollView, Text, View, StyleSheet ,SafeAreaView } from 'react-native';

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>

        <Text style={styles.text}>
          By accessing or using Infosec4TC (the "App") provided by Infosec4TC ("we", "us", or "our"), you agree to comply with and be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the App.
        </Text>

        <Text style={styles.subheading}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By downloading, installing, or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.
        </Text>

        <Text style={styles.subheading}>2. Use of the App</Text>
        <Text style={styles.text}>
          You agree to use the App only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that your use of the App does not violate any applicable laws or regulations.
        </Text>

        <Text style={styles.subheading}>3. License Grant</Text>
        <Text style={styles.text}>
          Subject to these Terms, we grant you a non-exclusive, non-transferable, revocable license to use the App solely for personal, non-commercial purposes on your mobile device.
        </Text>

        <Text style={styles.subheading}>4. User Accounts</Text>
        <Text style={styles.text}>
          To access certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information and to update it as necessary to maintain its accuracy. You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
        </Text>

        <Text style={styles.subheading}>5. Prohibited Activities</Text>
        <Text style={styles.text}>
          You agree not to use the App in any manner that could harm, disable, overburden, or impair the App's operation or interfere with any other user's enjoyment.
        </Text>

        <Text style={styles.subheading}>6. Intellectual Property</Text>
        <Text style={styles.text}>
          All content, features, and functionality of the App are owned by Infosec4TC or its licensors and are protected by copyright, trademark, and other intellectual property laws.
        </Text>

        <Text style={styles.subheading}>7. Privacy Policy</Text>
        <Text style={styles.text}>
          Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please read our Privacy Policy carefully.
        </Text>

        <Text style={styles.subheading}>8. Third-Party Links and Content</Text>
        <Text style={styles.text}>
          The App may contain links to third-party websites, services, or resources. We are not responsible for the availability or accuracy of third-party content, and we do not endorse any third-party websites or services.
        </Text>

        <Text style={styles.subheading}>9. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to suspend or terminate your access to the App at any time, without notice, for any reason, including if you violate these Terms.
        </Text>

        <Text style={styles.subheading}>10. Disclaimers</Text>
        <Text style={styles.text}>
          The App is provided "as is" and "as available" without any warranties or representations, express or implied, including but not limited to the implied warranties of merchantability or fitness for a particular purpose.
        </Text>

        <Text style={styles.subheading}>11. Limitation of Liability</Text>
        <Text style={styles.text}>
          To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the App, even if we have been advised of the possibility of such damages.
        </Text>

        <Text style={styles.subheading}>12. Governing Law</Text>
        <Text style={styles.text}>
          These Terms shall be governed by and construed in accordance with the laws of [Your Country/State]. Any legal action or proceeding related to these Terms shall be brought exclusively in the courts located in [Your Jurisdiction], and you consent to the jurisdiction of such courts.
        </Text>

        <Text style={styles.subheading}>13. Changes to the Terms</Text>
        <Text style={styles.text}>
          We may update or modify these Terms from time to time. We will notify you of any changes by posting the updated Terms in the App or on our website. By continuing to use the App after the changes are posted, you accept and agree to the modified Terms.
        </Text>

        <Text style={styles.subheading}>14. Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms, please contact us at:
        </Text>

        <Text style={styles.text}>
          Infosec4TC{'\n'}
          infosec4tc@infosec4tc.com{'\n'}
          
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  subheading: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 22,
    fontWeight:'600',
    marginVertical: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
    width: 333,
    marginBottom: 10,
  },
});

export default Terms;
