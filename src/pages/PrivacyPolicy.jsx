import {
  Box, Container, Divider, Typography,
} from '@mui/material';
import React from 'react';

function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Box sx={{ p: 5 }}>
        <Typography variant="h3" fontWeight={600}>
          Privacy Policy
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Last updated: 25th April,2023
        </Typography>
        <Divider sx={{ my: 1 }} />

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Introduction
        </Typography>
        <Typography variant="body1">
          Our privacy policy will help you understand what information we collect at &lt;client&gt;,
          how &lt;client&gt; uses it, and what choices you have. &lt;client&gt; built the
          &lt;client&gt; app as a free app. This SERVICE is provided by &lt;client&gt; at no cost
          and is intended for use as is.
        </Typography>
        <br />
        <Typography variant="body1">
          If you choose to use our Service, then you agree to the collection and use of information
          in relation with this policy. The Personal Information that we collect are used for
          providing and improving the Service. We will not use or share your information with anyone
          except as described in this Privacy Policy.
        </Typography>
        <br />
        <Typography variant="body1">
          The terms used in this Privacy Policy have the same meanings as in our Terms and
          Conditions, which is accessible in our website, unless otherwise defined in this Privacy
          Policy.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Information Collection and Use
        </Typography>
        <Typography variant="body1">
          For a better experience while using our Service, we may require you to provide us with
          certain personally identifiable information, including but not limited to users name,
          email address, phone number, images. The information that we request will be retained by
          us and used as described in this privacy policy. The app does use third party services
          that may collect information used to identify you.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Service Providers
        </Typography>
        <Typography variant="body1">
          We may employ third-party companies and individuals due to the following reasons:
        </Typography>
        <ul>
          <li>To facilitate our Service;</li>
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>
        <Typography variant="body1">
          We want to inform users of this Service that these third parties have access to your
          Personal Information. The reason is to perform the tasks assigned to them on our behalf.
          However, they are obligated not to disclose or use the information for any other purpose.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Security
        </Typography>
        <Typography variant="body1">
          We value your trust in providing us your Personal Information, thus we are striving to use
          commercially acceptable means of protecting it. But remember that no method of
          transmission over the internet, or method of electronic storage is 100% secure and
          reliable, and we cannot guarantee its absolute security.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Children&apos;s Privacy
        </Typography>
        <Typography variant="body1">
          This Services do not address anyone under the age of 13. We do not knowingly collect
          personal identifiable information from children under 13. In the case we discover that a
          child under 13 has provided us with personal information, we immediately delete this from
          our servers. If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact us so that we will be able to do
          necessary actions.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1">
          We may update our Privacy Policy from time to time. Thus, you are advised to review this
          page periodically for any changes. We will notify you of any changes by posting the new
          Privacy Policy on this page. These changes are effective immediately, after they are
          posted on this page.
        </Typography>

        <Typography variant="h4" fontWeight={600} sx={{ mt: 2, mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to
          contact us.
        </Typography>
        <Typography variant="body1">Contact Information:</Typography>
        <Typography variant="body1">Email:</Typography>
      </Box>
    </Container>
  );
}

export default PrivacyPolicy;
