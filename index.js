
// On Streaming
const startStreamingVideo = () => {

  const video = document.querySelector( "#video" );
      
  if( navigator.mediaDevices.getUserMedia ){

    navigator.mediaDevices.getUserMedia( { video: true } )
    .then( ( stream ) => {
        video.srcObject = stream;
    } );

  }

}
startStreamingVideo();

// Capture image from video streaming after loading the video stream.
// Reference => https://qiita.com/iwaimagic/items/1d16a721b36f04e91aed
video.onloadedmetadata = () => {

  const btCapture = document.getElementById( 'btCapture' );

  btCapture.addEventListener( 'click', () => {
    
    // Capture: draw to hidden canvas
    const hiddenCanvas = document.getElementById( 'hiddenCanvas' );
    const ctx = hiddenCanvas.getContext('2d');
    const WIDTH = 500;
    const HEIGHT = 375;
    ctx.drawImage( video, 0, 0, WIDTH, HEIGHT );
    
    // Download: load DataURL and convert to png
    const link = document.getElementById( 'hiddenLink' );
    link.href = hiddenCanvas.toDataURL();
    // document.getElementById('hiddenCanvas').src = hiddenCanvas.toDataURL();
    link.download = getYYYYMMDD_hhmmss( true ) + ".png";
    link.click();

  });

  btCapture.disabled = false;

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

// padding function
const padZero2Digit = ( num ) => {
  return ( num < 10 ? "0" : "" ) + num;
}

// Show readme
document.getElementById( "btShowReadMe" ).addEventListener( "click", async ev => {
  window.open('https://github.com/tetunori/HTML5WebcamTester/blob/master/README.md','_blank');
});
