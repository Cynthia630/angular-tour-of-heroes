import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent {

  imgbase64!: string;

  _fileObj: any;

  imgList: any[] = [];
  precent:any

  onFileSelected(event:any) {
    // console.log(new File(["asdds"],"a.txt"))  //创建File对象,但无法写入磁盘，所以一般不会自己创建，而是让用户选择合适的文件进行上传
    let file = event.target.files[0]
    this._fileObj=file
    // if (file.size > 10 * 24 * 24) {
    //   alert("文件不能大于十兆")
    // }
    // if (file.type!=='image/png') {
    //   alert("必须是png图片格式")
    // }
    // console.log(event.target.files[0],"传入的文件")
    // let _sliceBlob = new Blob([file]).slice(0, 5000);
    // let _sliceFile = new File([_sliceBlob], "test.png");
    // let fr = new FileReader()
    // //readAsDataURL()该方法是将file转换为base64的格式进行传输
    // fr.readAsDataURL(_sliceFile);  //将截取的base64格式的0~5000位进行传输
    // let self = this;
    // fr.onload = function () {  //用onload监听转化的base64的结果
    //   self.imgbase64=fr.result
    //   console.log(fr.result)
    // }
    //总结：怎么做缩略图，文本预览

    // 课题2：多文件上传（不用input中的multiple属性）
    if (event.target.files.length > 1) {
      this.imgList.concat(event.target.files)
    } else {
      this.imgList.push(event.target.files[0])
    }

  }
  //此方法call不通是404，因为api："/xx"是随便写的，但可以看到传输的文件格式
  //多文件上传的方法
  async submit() {
    this.imgList.forEach((item) => {
      let _formData = new FormData()
      // _formData.append("user", "asddfa")
      _formData.append(item.name+"file", item)
      axios.post("/xx",_formData)
    })
  }

  //课题3：切片上传
  // async submit() {
  //   let size = 2 * 1024 * 1024;
  //   let fileSize = this._fileObj.size;
  //   let current = 0;
  //   //断点续传  4mb
  //   // localStorage.setItem(this._fileObj.name,current)
  //   while (current < fileSize) {
  //     let _formData = new FormData();
  //     _formData.append(this._fileObj.name, this._fileObj.slice(current, current + size))
  //     // await axios.post("http://localhost:4000/upload", this._fileObj.slice(current, current + size))
  //     await axios.post("http://localhost:4000/upload")
  //     this.precent=Math.min((current/fileSize)*100,100)
  //     current += size;
  //   }
  // }
}
//1、单文件上传，切片上传，断点续传
//2、file blob fileReader formata
