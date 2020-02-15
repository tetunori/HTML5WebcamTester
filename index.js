
// Camera facing mode = flip mode
const FACING_MODE_ENVIRONMENT = "environment";
const FACING_MODE_USER = "user";
let gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;

// Flip camera
const switchCamera = () => {

  if( gCurrentCameraFacingMode === FACING_MODE_ENVIRONMENT ){
    gCurrentCameraFacingMode = FACING_MODE_USER;
  }else{
    gCurrentCameraFacingMode = FACING_MODE_ENVIRONMENT;
  }
  startStreamingVideo();

}

// Flip Cmera
const filpCameraElem = document.getElementById( "flipCameraImage" );
filpCameraElem.addEventListener( "mouseover", async ev => {
  filpCameraElem.style.opacity = 0.7;
});
filpCameraElem.addEventListener( "mouseout", async ev => {
  filpCameraElem.style.opacity = 0.3;
});
filpCameraElem.addEventListener( "click", async ev => {
  switchCamera();
});



// Video element
const video = document.querySelector( "#video" );

// On Streaming
const startStreamingVideo = () => {
      
  if( navigator.mediaDevices.getUserMedia ){

    navigator.mediaDevices.getUserMedia( 
      { video: { facingMode: gCurrentCameraFacingMode } } 
    ).then( ( stream ) => {
      video.srcObject = stream;
    } );
    
  }

}
startStreamingVideo();

// Capture image from video streaming after loading the video stream.
// Reference => https://qiita.com/iwaimagic/items/1d16a721b36f04e91aed
let gIsLoaded = false;
video.onloadedmetadata = () => {

  if( !gIsLoaded ){
    gIsLoaded = true;

    const btCapture = document.getElementById( 'btCapture' );

    btCapture.addEventListener( 'click', () => {
      
      // Capture: draw to hidden canvas
      const hiddenCanvas = document.getElementById( 'hiddenCanvas' );
      hiddenCanvas.width = video.videoWidth;
      hiddenCanvas.height = video.videoHeight;
      const ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage( video, 0, 0, hiddenCanvas.width, hiddenCanvas.height );

      // Download: load DataURL and convert to png
      const link = document.getElementById( 'hiddenLink' );
      link.href = hiddenCanvas.toDataURL();
      
      // document.getElementById('hiddenCanvas').src = hiddenCanvas.toDataURL();
      link.download = getYYYYMMDD_hhmmss( true ) + ".png";
      link.click();

    });

    btCapture.disabled = false;

  }

}

// Reference => https://gist.github.com/froop/962669
const getYYYYMMDD_hhmmss = ( isNeedUS ) => {

  const now = new Date();
  let retVal = '';

  // YYMMDD
  retVal += now.getFullYear();
  retVal += padZero2Digit( now.getMonth() + 1 );
  retVal += padZero2Digit( now.getDate() );
  
  if( isNeedUS ){ retVal += '_'; }
  
  // hhmmss
  retVal += padZero2Digit( now.getHours() );
  retVal += padZero2Digit( now.getMinutes() );
  retVal += padZero2Digit( now.getSeconds() );

  return retVal;

}

// Zero padding function
const padZero2Digit = ( num ) => {
  return ( num < 10 ? "0" : "" ) + num;
}

// Show readme
document.getElementById( "btShowReadMe" ).addEventListener( "click", async ev => {
  window.open('https://github.com/tetunori/HTML5WebcamTester/blob/master/README.md','_blank');
});
