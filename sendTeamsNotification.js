function sendTeamsNotification(webhookUrl, message) {
    var postData = JSON.stringify({ text: message });
  
    var URL = java.net.URL;
    var HttpURLConnection = java.net.HttpURLConnection;
    var SSLContext = javax.net.ssl.SSLContext;
    var TrustManager = javax.net.ssl.TrustManager;
    var HostnameVerifier = javax.net.ssl.HostnameVerifier;
    var HttpsURLConnection = javax.net.ssl.HttpsURLConnection;
  
    var url = new URL(webhookUrl);
    var connection = url.openConnection();
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);
    connection.setRequestProperty("Content-Type", "application/json");
  
    /*
    // Ignore SSL certificate errors for testing purposes
    var sslContext = SSLContext.getInstance("TLS");
    sslContext.init(null, [new TrustManager()], new java.security.SecureRandom());
    HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
    HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier());
    */
  
    var outputStream = connection.getOutputStream();
    var postDataBytes = new java.lang.String(postData).getBytes("UTF-8");
    outputStream.write(postDataBytes);
    outputStream.close();
  
    var responseCode = connection.getResponseCode();
    if (responseCode === 200) {
      $c("notification_status","Notification sent successfully!");
    } else {
      $c("notification_status","Failed to send notification. Status code: " + responseCode);
    }
  
    connection.disconnect();
  }
  
  // Custom TrustManager to ignore SSL certificate errors for testing purposes
  function TrustManager() {
    this.checkClientTrusted = function(chain, authType) {};
    this.checkServerTrusted = function(chain, authType) {};
    this.getAcceptedIssuers = function() { return null; };
  }
  
  // Custom HostnameVerifier to bypass hostname verification for testing purposes
  function HostnameVerifier() {
    this.verify = function(hostname, session) { return true; };
  }
  
  var webhookUrl = 'YOUR_WEBHOOK_URL';
  var teams_message = 'Hello, Teams!';
  
  sendTeamsNotification(webhookUrl, teams_message);