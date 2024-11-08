const wipeState = () => {
console.log(localStorage.getItem("operation"))
console.log(localStorage.getItem("manifest"))
  localStorage.removeItem("operation");
  localStorage.removeItem("manifest");
  console.log("operation wiped");
}

export default wipeState