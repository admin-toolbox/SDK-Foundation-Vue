<?php

namespace API;

use SendGrid\Mail\Mail;

class contact  {

    // POST /api/contact/send
    public function send(\Base $fw, $args) {
        header("Content-type: application/json");

        $to = $fw->get("email.to");
        
        $from = $fw->get("email.from"); // Pulled from backend/config.ini
        $business_name = $fw->get("business_name"); // Pulled from backend/config.ini

        // Fields provided by user
        $name = $fw->get("POST.name");
        $email = $fw->get("POST.email");
        $phone = $fw->get("POST.phone");
        $message = $fw->get("POST.message");

        $subject = "[{$business_name}] Website visitor contact requested.";

        // Construct text email body
        $message = <<<"END_OF_MESSAGE"
Hello,

A visitor filled out the website contact form with the following information:

Name: {$name}
Email: {$email}
Phone: {$phone}

Message: {$message}
END_OF_MESSAGE;

        // Setup Sendgrid object
        $email = new \SendGrid\Mail\Mail();
        $email->addTo($to);
        $email->setFrom($from, $business_name);
        $email->setSubject($subject);
        $email->addContent("text/plain", $message);
        
        // Send email
        $sendgrid = new \SendGrid($fw->get('sendgrid.apikey'));
        try {
            $response = $sendgrid->send($email);
            echo json_encode(array('success' => true));
        } catch (Exception $e) {
            echo json_encode(array('success' => false, 'message' => $e->getMessage()));
        }

        exit;
    } // End of method send()

}
