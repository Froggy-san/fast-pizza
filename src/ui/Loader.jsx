// inset = top:0 bottom:0 left:0 right:0
// adding / then a number 20 to a background color will add opacity
function Loader() {
  return (
    <div className="absolute inset-0 flex  items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
