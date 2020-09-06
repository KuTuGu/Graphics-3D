const VSHADER_SOURCE = `
// 顶点坐标和颜色
attribute vec4 a_Position;
attribute vec4 a_Color;
// 平面法线向量
attribute vec4 a_Normals;
// 逆转置矩阵
uniform mat4 u_NormalMatrix; 
// 变化矩阵，转化物体顶点坐标
uniform mat4 u_MvpMatrix;
// 平行光方向向量
uniform vec3 u_LightDirection;
// 传递片元内插后的颜色
varying vec4 v_Color;
void main(){
    gl_Position = u_MvpMatrix * a_Position;
    v_Color =  * a_Color;
}
`;
const FSHADER_SOURCE = `
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}
`;
