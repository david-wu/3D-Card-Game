const TreeNode = require('./TreeNode.js');

class Placeable extends TreeNode{

	constructor(options){
		super(options);
		_.extend(this, options)
		_.defaults(this, {
			pos: {
				x: 0,
				y: 0,
				z: 0,
				angle: 0,
			},
		})
	}

	moveTo(pos){
		_.extend(this.pos, pos);
	}

	layoutDeep(){

		this.depthFirstTraverse(function(node){
			node.absPos = {
				x: 0,
				y: 0,
				z: 0,
				angle: node.parent ? node.parent.absPos.angle+node.pos.angle : node.pos.angle,
			};

			// Reuse rotationMatrix if no change to absAngle
			if(!node.pos.angle && node.parent){
				node.absPos.rotationMatrix = node.parent.absPos.rotationMatrix
			}else{
				node.absPos.rotationMatrix = getRotationMatrix(node.absPos.angle)
			}
		});

		this.depthFirstTraverse(function(node){
			rotatePos(node.pos, node.absPos.rotationMatrix, node.absPos);
			if(node.parent){
				sumPos(node.absPos, node.parent.absPos);
			}
		})
	}

}

function getRotationMatrix(angle){
	const theta = -angle*Math.PI/180;
	const sinTheta = Math.sin(theta);
	const cosTheta = Math.cos(theta);
	return [
		[cosTheta, -sinTheta],
		[sinTheta, cosTheta]
	];
}

function rotatePos(pos, rotationMatrix, recycle={}){
	const x = pos.x*rotationMatrix[0][0] + pos.y*rotationMatrix[0][1];
	const y = pos.x*rotationMatrix[1][0] + pos.y*rotationMatrix[1][1];
	recycle.x = x;
	recycle.y = y;
	return recycle;
}

function sumPos(pos1, pos2){
	pos1.x += pos2.x || 0;
	pos1.y += pos2.y || 0;
	pos1.z += pos2.z || 0;
}

module.exports = Placeable;
