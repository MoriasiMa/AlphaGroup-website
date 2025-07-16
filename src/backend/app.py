from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Email configuration using environment variables
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER')

# Recipient email for contact form
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'mavinmavo2@gmail.com')

mail = Mail(app)

def create_styled_email_body(data):
    """Create a styled HTML email body"""
    service_type = data.get('serviceType', 'General Inquiry')
    phone = data.get('phone', 'Not provided')
    timestamp = datetime.now().strftime('%B %d, %Y at %I:%M %p')
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #D97706 0%, #374151 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                                    📧 New Contact Form Submission
                                </h1>
                                <p style="color: #FDE68A; margin: 10px 0 0 0; font-size: 16px;">
                                    Alpha Consulting KE Website
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <p style="color: #374151; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
                                    You have received a new contact form submission from your website. Here are the details:
                                </p>
                                
                                <!-- Contact Details Card -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FEF3C7; border: 2px solid #D97706; border-radius: 8px; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <h2 style="color: #92400E; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">
                                                👤 Contact Information
                                            </h2>
                                            <table width="100%" cellpadding="8" cellspacing="0">
                                                <tr>
                                                    <td style="color: #92400E; font-weight: bold; width: 120px; vertical-align: top;">Name:</td>
                                                    <td style="color: #374151; font-size: 16px;">{data.get('name')}</td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #92400E; font-weight: bold; vertical-align: top;">Email:</td>
                                                    <td style="color: #374151; font-size: 16px;">
                                                        <a href="mailto:{data.get('email')}" style="color: #2563EB; text-decoration: none;">
                                                            {data.get('email')}
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #92400E; font-weight: bold; vertical-align: top;">Phone:</td>
                                                    <td style="color: #374151; font-size: 16px;">
                                                        {"<a href='tel:" + phone + "' style='color: #2563EB; text-decoration: none;'>" + phone + "</a>" if phone != 'Not provided' else phone}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="color: #92400E; font-weight: bold; vertical-align: top;">Service:</td>
                                                    <td style="color: #374151; font-size: 16px;">
                                                        <span style="background-color: #D97706; color: white; padding: 4px 8px; border-radius: 4px; font-size: 14px;">
                                                            {service_type}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Message Card -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F3F4F6; border-left: 4px solid #D97706; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <h2 style="color: #374151; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">
                                                💬 Message
                                            </h2>
                                            <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-line;">
                                                {data.get('message')}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <!-- Action Buttons -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                                    <tr>
                                        <td align="center">
                                            <table cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="padding-right: 10px;">
                                                        <a href="mailto:{data.get('email')}" style="background-color: #D97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                                                            Reply via Email
                                                        </a>
                                                    </td>
                                                    {"<td><a href='tel:" + phone + "' style='background-color: #374151; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;'>Call Now</a></td>" if phone != 'Not provided' else ""}
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #F9FAFB; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; border-top: 1px solid #E5E7EB;">
                                <p style="color: #6B7280; font-size: 14px; margin: 0 0 10px 0;">
                                     Submitted on {timestamp}
                                </p>
                                <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                                    This email was automatically generated from your Alpha Consulting KE website contact form.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    
    # Plain text version for email clients that don't support HTML
    text_body = f"""
    New Contact Form Submission - Alpha Consulting KE
    
    Contact Information:
    Name: {data.get('name')}
    Email: {data.get('email')}
    Phone: {phone}
    Service Type: {service_type}
    
    Message:
    {data.get('message')}
    
    Submitted at: {timestamp}
    """
    
    return html_body, text_body

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('name') or not data.get('email') or not data.get('message'):
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        # Create email content
        html_body, text_body = create_styled_email_body(data)
        
        subject = f"🔔 New {data.get('serviceType', 'General')} Inquiry - {data.get('name')}"
        
        # Create and send email
        msg = Message(
            subject=subject,
            recipients=[RECIPIENT_EMAIL],
            html=html_body,
            body=text_body,
            reply_to=data.get('email')
        )
        
        mail.send(msg)
        
        return jsonify({'message': 'Message sent successfully'}), 200
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'error': 'Failed to send message. Please try again.'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Backend is running'}), 200

@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Alpha Consulting KE Backend API', 'status': 'running'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)