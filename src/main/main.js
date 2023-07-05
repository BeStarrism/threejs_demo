import * as THREE from "three";
//导入轨道控制器
import {OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入gui
import * as dat from "dat.gui"

// 学习目标：使用控制器查看3d物体；添加坐标轴；


//1.创建场景
const scene = new THREE.Scene();

//2.创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

//3.添加物体步骤
//3.1创建几何体
//3.2根据几何体和材质创建物体
//3.3将几何体添加到场景

//循环生成炫酷三角形
// for (let i = 0; i < 50; i++){
//   const geometry = new THREE.BufferGeometry();
//   const positionArray = new Float32Array(9);
//   for (let j = 0; j < 9; j++){
//     positionArray[j] = Math.random() * 10 - 5;//坐标随机生成，将位置置于坐标轴中心
//   }
//   geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
//   let color = new THREE.Color(Math.random(), Math.random(), Math.random());//颜色随机
//   const material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5 });
//   const mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);
// }

//纹理贴图
//导入纹理
const textureLoader = new THREE.TextureLoader();
const logoColorTexture = textureLoader.load("/dist/textures/door.jpg");

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 ); 
const basicMaterial = new THREE.MeshBasicMaterial({ color: "#ffff00", map: logoColorTexture, });
const cube = new THREE.Mesh( cubeGeometry, basicMaterial ); 
scene.add( cube );

//纹理偏移
logoColorTexture.offset.set(0.5, 0.5);
//纹理旋转
//1.设置旋转原点
logoColorTexture.center.set(0.5, 0.5);
//2.旋转45°
logoColorTexture.rotation = Math.PI / 4;
//纹理重复
logoColorTexture.repeat.set(2, 3);
//设置重复的模式
logoColorTexture.wrapS = THREE.MirroredRepeatWrapping;//水平方向，镜像
logoColorTexture.wrapT = THREE.RepeatWrapping;//垂直方向

//4.渲染
//初始化渲染器
const renderer = new THREE.WebGL1Renderer();
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);
//使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);//参数需要相机和canvas
//修改物体位置
// cube.position.x = 3;
//缩放
// cube.scale.set(1, 2, 1);
//旋转
// cube.rotation.set(Math.PI / 4, 0, 0)
//设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;

//设置动画
// var animate1 = gsap.to(cube.position,
//   {
//     x: 5,
//     duration: 5,
//     ease: "power1.inOut",
//     //重复次数：-1是无限
//     repeat: -1,
//     //往返运动
//     yoyo: true,
//     //延迟
//     delay:2,
//   });
// gsap.to(cube.rotation,
//   {
//     x: 2 * Math.PI,
//     duration: 5,
//     ease: "power1.inOut"
//   });

// window.addEventListener("dblclick", () => {
//   if (animate1.isActive()) {
//     animate1.pause();
//   } else {
//     animate1.resume();
//   }
// })

window.addEventListener("dblclick", () => {
  const fullScreenElement = document.fullscreenElement;
  if (!fullScreenElement) {
    //双击控制屏幕进入和退出全屏
    //让画布对象全屏
    renderer.domElement.requestFullscreen();
  } else {
    //退出全屏，使用document对象
    document.exitFullscreen();
  }
})

function render() {
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;
  // let t = time / 1000 % 5;
  // cube.position.x = t * 1;
  // cube.rotation.x = t * 1;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }
  controls.update();
  renderer.render(scene, camera);//通过相机将场景渲染进来
  requestAnimationFrame(render);//渲染下一帧时再调用render函数
}

render();

// 添加坐标轴
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper);

//监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})


// //用户可视化自主更改变量
// const gui = new dat.GUI();
// gui
//   .add(cube.position, "x")
//   .min(0).max(5)
//   //分度值
//   .step(0.01)
//   .name("移动x轴")
//   .onChange((value) => {
//     console.log("值被修改：", value);
//   })
//   .onFinishChange((value) => {
//     console.log("完全停下：", value);
//   });

// //修改物体的颜色、设置按钮点击触发某个事件
// const params = {
//   color: "#ffff00",
//   fn: () => {
//     gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 });
//   }
// };
// gui.addColor(params, "color").onChange((value) => {
//   console.log("值被修改：", value);
//   cube.material.color.set(value);
// });

// gui.add(params, "fn").name("立方体运动");

// //设置是否显示
// gui.add(cube, "visible").name("是否显示");

// //设置文件夹
// var folder = gui.addFolder("设置立方体");
// folder.add(cube.material, "wireframe");