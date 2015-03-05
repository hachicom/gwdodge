function mediaSuccess() {
    console.log( 'mediaSuccess' );
}
function mediaError( errObj ) {
    console.error( 'mediaError code=' + errObj.code + 
                  ' message=' + errObj.message );
}
function mediaStatus() {
     console.log( 'mediaStatus' );
}
function createMedia( file ) {
    if ( typeof Media != 'undefined' ) {
        if ( (typeof device != 'undefined') && 
              (device.platform == 'Android') ) {
            file = '/android_asset/www/' + file ;
        } 
        return new Media( file, mediaSuccess, 
                         mediaError, mediaStatus );
    }
    else {
        return file ;
    }
}
function playSound( media ) {
    if ( appPaused ) {
        return ;
    }
    if ( typeof Media != 'undefined' ) {
	   media.seekTo(0);
	   media.play();
	}
	else {
	    console.log( 'playSound ' + media );
	}
}
// preload sound files
//snap_mp3 = createMedia( 'snap.mp3' );
// play sound file
//playSound( snap_mp3 );