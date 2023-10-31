const accountCreatedMail = (username) => `
<html>
<head>
<style>
</style>

</head>

<body style="margin: 0; padding: 0; width: 100%; font-family:Tahoma, Geneva, Verdana, sans-serif">
    <div style="max-width: 540px; margin: 0 auto; border: 1px solid #1f1e1e17; border-radius: 1.3rem; padding: 40px 60px 60px; margin: 0 auto; background-color: #FFFBF5;">
        <p style="font-weight: 600; font-size: 1.80rem; color: #074968; margin: 0; padding: 0; text-transform: capitalize;">Dear ${username},</p>

        <div style="width: 100%; position: relative; margin-top: 1rem;">
            <img src="https://i.ibb.co/zmH3tnv/Mx.jpg" alt="" style="width: 140px; max-width: 140px; border-radius: 0.2rem; margin: 0 0 0 33%;">
        </div>

        <p style="font-weight: 400; font-size: 0.95rem; color: #190a35;">Welcome to the Mx Live Chat Platform!
            We're excited to have you on board and look forward to providing you with
            a seamless communication experience.</p>

        <p style="font-weight: 400; font-size: 0.95rem; color: #190a35;">Your account has been successfully
            created. Here are a few things you can do with your new account:</p>

        <ul style="font-weight: 400; font-size: 0.95rem; color: #190a35;">
            <li>Start engaging in real-time conversations with friends all over the world.</li>
            <li>Customize your profile and settings to your preference and sweetness.</li>
            <li>Explore our features and tools to make the most out of your Live Chat experience.</li>
        </ul>

        <p style="font-weight: 400; font-size: 0.95rem; color: #190a35;">If you have any questions or need
            assistance, our support team is here to help. Feel free to reach out to us
            anytime at <a href="mailto:support@mxchat.com"
                style="color: #000000;">support@mxchat.com</a>.</p>

        <p style="font-weight: 400; font-size: 0.95rem; color: #190a35;">Thank you for choosing us as your
            communication partner. We're committed to making your experience
            outstanding!</p>

            <p style="font-weight: 400; font-size: 0.8rem; color: #190a35; margin-top: 25px; padding: 0;">Best regards,</p>
            <p style="font-weight: 700; font-size: 1.05rem; color: #190a35c7; margin-top: 10px; padding: 0;">The Mx Chat Team</p>
    </div>
</body>
</html>
`;

module.exports = {
  accountCreatedMail,
};
