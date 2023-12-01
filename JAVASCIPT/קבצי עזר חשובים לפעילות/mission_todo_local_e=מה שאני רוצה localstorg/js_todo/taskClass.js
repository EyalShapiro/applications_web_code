class Task{
  constructor(_parent,_item){
    this.parent = _parent;
    this.name = _item.name;
    this.time = _item.time;
  }

  render(){
    let div = document.createElement("div");
    div.className = "shadow-sm my-2 p-2";
    document.querySelector(this.parent).append(div);

    div.innerHTML += `
    <h4>${this.name} - ${this.time}</h4>
    `
  }
}