export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
    }

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: process.env.WEB3FORMS_ACCESS_KEY,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return res.status(400).json({
                success: false,
                message: data.message || "Unable to send your message."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully!"
        });

    } catch (error) {
        console.error("Contact form error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
}