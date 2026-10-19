<?php
// Contact form handler for dev.cubedevelopments.com
// Sends with PHP mail(); returns JSON for fetch() requests, otherwise redirects.
declare(strict_types=1);

const MAIL_TO   = 'noreply@dev.cubedevelopments.com';
const MAIL_FROM = 'noreply@dev.cubedevelopments.com';
const SITE_NAME = 'Cube Developments';

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $message, int $status = 200): void {
    global $wantsJson;
    http_response_code($status);
    if ($wantsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
    } else {
        $back = '/contact/?sent=' . ($ok ? '1' : '0');
        header('Location: ' . $back, true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 'Method not allowed.', 405);
}

// Honeypot: bots fill the hidden "website" field. Pretend success.
if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(true, 'Thank you, your message has been sent.');
}

function clean_line(string $v, int $max): string {
    $v = trim(preg_replace('/[\r\n\t\0]+/', ' ', $v) ?? ''); // strips header-injection characters
    return mb_substr(strip_tags($v), 0, $max);
}

$name    = clean_line((string)($_POST['name'] ?? ''), 100);
$email   = clean_line((string)($_POST['email'] ?? ''), 254);
$phone   = clean_line((string)($_POST['phone'] ?? ''), 40);
$message = trim(str_replace("\0", '', strip_tags((string)($_POST['message'] ?? ''))));
$message = mb_substr(preg_replace("/\r\n?/", "\n", $message) ?? '', 0, 5000);

$errors = [];
if ($name === '') $errors[] = 'name';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($phone !== '' && !preg_match('/^[0-9 +().-]{6,40}$/', $phone)) $errors[] = 'phone';
if (mb_strlen($message) < 2) $errors[] = 'message';
if ($errors) {
    respond(false, 'Please check: ' . implode(', ', $errors) . '.', 422);
}

$subject = '=?UTF-8?B?' . base64_encode(SITE_NAME . ' website enquiry from ' . $name) . '?=';
$body = "Name: {$name}\nEmail: {$email}\nPhone: " . ($phone ?: '-') . "\n\nMessage:\n{$message}\n\n--\nSent from " . ($_SERVER['HTTP_HOST'] ?? 'website') . ' at ' . date('c') . "\n";

$headers = [
    'From: ' . SITE_NAME . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . $email, // validated by FILTER_VALIDATE_EMAIL and stripped of CR/LF
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

if ($sent) {
    respond(true, 'Thank you, your message has been sent. We will be in touch soon.');
}
respond(false, 'Sorry, your message could not be sent. Please email enquiries@cubedevelopments.com.', 500);
