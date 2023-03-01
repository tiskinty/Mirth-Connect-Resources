//Usage example: sftpGet("127.0.0.1",22,"username","password",true);
function sftpGet(ip,port,user,pass,remove){
	importPackage(com.jcraft.jsch);
	importPackage(java.io);
	importPackage(java.lang);
	importPackage(java.nio.charset);
	
	function toByteArray(str){
		var bytes = [];
		for (var i = 0; i < str.length; ++i) {
    		bytes.push(str.charCodeAt(i));
		}
		return bytes;
	}
	
	// testing vars
	var verbose = false;
	
	//create object.
	var jsch = new JSch();
	jsch.setConfig('StrictHostKeyChecking','no');
	var session = jsch.getSession(user,ip,port);
	session.setPassword(pass);
	session.setTimeout(2000);
	session.connect();
	var channel = session.openChannel('sftp');
	var ioexception = new Packages.java.io.IOException;
	channel.connect();
	if(verbose){logger.info('Connected to SFTP: ');}
	if(verbose){logger.info('Home Directory: ' + channel.getHome());}
	channel.cd('/'); //Folder on the SFTP server where file will be found
	var counter
	var directoryList = channel.ls("*.txt");
	if(directoryList.size()>0||verbose){logger.info('Number of Files on Server ' + directoryList.size());}
	if (directoryList.size() > 0){
		for(var i=0; i<directoryList.size();i++) {
			var filename = directoryList.get(i).getFilename();
			logger.info('File Name: ' + filename);
			var is = channel.get(filename);
			var bReader = new BufferedReader(new InputStreamReader(is));
			var sbfFileContents = "";
			var line;
			//read file line by line
	        while((line = bReader.readLine())!=null&&line.length()!=0){
        		sbfFileContents+=line;
				}
			var stream = new ByteArrayInputStream(toByteArray(sbfFileContents));
	/*******************/
	channel.put(stream,"test/"+filename); //copies file to subfolder for testing
	/*******************/

			// Remove After Processing
			if(remove){channel.rm(filename);}
		}   
	}
	//Close everything down
	channel.disconnect();
	session.disconnect();	
	return;
}
