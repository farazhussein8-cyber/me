$root = "C:\Users\GGPC\frosty-haven-website"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8934/")
$listener.Start()

$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript";
  ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"; ".png"="image/png"; ".webp"="image/webp";
  ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".json"="application/json"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $request = $context.Request
  $response = $context.Response
  try {
    $path = $request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath)
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $response.ContentType = $contentType
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch {
  } finally {
    $response.OutputStream.Close()
  }
}
