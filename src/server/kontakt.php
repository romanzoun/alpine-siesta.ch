<?php
// Kontaktformular (Phase 1, ohne Backend). Wird beim Build nach dist/kontakt.php kopiert;
// die Einstellungen kommen aus site/site.config.ts (kontakt, email, name, domain).
// Läuft auf jedem Hosting mit PHP und mail() (z. B. Infomaniak Webhosting).
declare(strict_types=1);

$konfig = json_decode(<<<'KONFIG'
__KONFIG__
KONFIG, true, 512, JSON_THROW_ON_ERROR);

header('X-Robots-Tag: noindex');
header('Cache-Control: no-store');

$alsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function antwort(bool $ok, string $meldung, int $status = 200): never
{
    global $alsJson, $konfig;
    http_response_code($status);
    if ($alsJson) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'meldung' => $meldung], JSON_UNESCAPED_UNICODE);
    } elseif ($ok) {
        header('Location: /kontakt/danke/', true, 303);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo $meldung . "\n\nBitte zurück und nochmals versuchen oder direkt an " . $konfig['email'] . ' schreiben.';
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    antwort(false, 'Nur POST', 405);
}

// Spam: Falle ausgefüllt oder Formular in weniger als 3 Sekunden abgeschickt → so tun, als ob alles gut wäre
$t = (int) ($_POST['t'] ?? 0);
if (($_POST['website'] ?? '') !== '' || ($t > 0 && time() - $t < 3)) {
    antwort(true, 'ok');
}

// Höchstens 5 Anfragen pro Stunde und IP
$ipDatei = sys_get_temp_dir() . '/kontakt-' . hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
$zeiten = array_filter(
    is_file($ipDatei) ? array_map('intval', file($ipDatei, FILE_IGNORE_NEW_LINES) ?: []) : [],
    fn (int $z) => $z > time() - 3600
);
if (count($zeiten) >= 5) {
    antwort(false, 'Zu viele Anfragen – bitte später nochmals versuchen.', 429);
}

$text = fn (string $feld, int $max) => trim(mb_substr((string) ($_POST[$feld] ?? ''), 0, $max));
$zeile = fn (string $wert) => preg_replace('/[\r\n\t]+/', ' ', $wert); // keine Zeilenumbrüche in Kopfzeilen

$name = $zeile($text('name', 100));
$email = $text('email', 200);
$nachricht = $text('nachricht', 5000);
$wohnung = $text('wohnung', 60);
$anreise = $text('anreise', 10);
$abreise = $text('abreise', 10);
$gaeste = (int) ($_POST['gaeste'] ?? 0);

if ($name === '' || $nachricht === '') {
    antwort(false, 'Bitte Name und Nachricht angeben.', 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    antwort(false, 'Bitte eine gültige E-Mail-Adresse angeben.', 422);
}
$datum = '/^\d{4}-\d{2}-\d{2}$/';
if (($anreise !== '' && !preg_match($datum, $anreise)) || ($abreise !== '' && !preg_match($datum, $abreise))) {
    antwort(false, 'Datum ungültig.', 422);
}
if ($anreise !== '' && $abreise !== '' && $abreise <= $anreise) {
    antwort(false, 'Die Abreise muss nach der Anreise liegen.', 422);
}
$wohnungName = $konfig['wohnungen'][$wohnung] ?? '';

$betreff = 'Anfrage' . ($wohnungName !== '' ? ' ' . $wohnungName : '') . ($anreise !== '' ? " für $anreise" : '') . " von $name";
$inhalt = implode("\n", array_filter([
    "Neue Anfrage über {$konfig['domain']}",
    '',
    "Name:     $name",
    "E-Mail:   $email",
    $wohnungName !== '' ? "Wohnung:  $wohnungName" : null,
    $anreise !== '' ? "Anreise:  $anreise" : null,
    $abreise !== '' ? "Abreise:  $abreise" : null,
    $gaeste > 0 ? "Gäste:    $gaeste" : null,
    '',
    $nachricht,
    '',
    '—',
    'Antworten: einfach auf diese Mail antworten (geht direkt an den Gast).',
], fn ($z) => $z !== null));

$kopf = implode("\r\n", [
    'From: ' . mb_encode_mimeheader($konfig['name'], 'UTF-8') . " <{$konfig['absender']}>",
    'Reply-To: ' . mb_encode_mimeheader($name, 'UTF-8') . " <$email>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$gesendet = mail($konfig['empfaenger'], mb_encode_mimeheader($betreff, 'UTF-8'), $inhalt, $kopf, '-f' . $konfig['absender']);
if (!$gesendet) {
    antwort(false, 'Die Nachricht konnte nicht gesendet werden.', 500);
}
$zeiten[] = time();
@file_put_contents($ipDatei, implode("\n", $zeiten));
antwort(true, 'ok');
