export default async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== 'POST') {

        return res.status(405).json({

            success: false,

            message: 'Method not allowed'

        });

    }


    try {

        // Get information sent from the contact form
        const {
            first_name,
            last_name,
            email,
            phone,
            message
        } = req.body;


        // Combine first and last name
        const name =
            `${first_name} ${last_name}`.trim();


        // Send information to Web3Forms
        const response = await fetch(
            'https://api.web3forms.com/submit',
            {

                method: 'POST',

                headers: {

                    'Content-Type': 'application/json',

                    'Accept': 'application/json'

                },

                body: JSON.stringify({

                    // IMPORTANT:
                    // The key is ONLY available on the server
                    access_key:
                        process.env.WEB3FORMS_ACCESS_KEY,

                    name: name,

                    email: email,

                    phone: phone,

                    message: message,

                    subject:
                        'New Contact Message - Chidinma Okafor Portfolio'

                })

            }
        );


        const data = await response.json();


        // Web3Forms accepted the message
        if (response.ok && data.success) {

            return res.status(200).json({

                success: true,

                message: 'Message sent successfully!'

            });

        }


        // Web3Forms rejected the message
        return res.status(400).json({

            success: false,

            message:
                data.message ||
                'Failed to send message.'

        });


    } catch (error) {

        console.error('Server error:', error);


        return res.status(500).json({

            success: false,

            message:
                'Something went wrong on the server.'

        });

    }

}