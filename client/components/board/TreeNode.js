
class TreeNode{

	constructor(options){
		_.extend(this, options)
		_.defaults(this, {
			children: []
		})
		this.setChildren(this.children)
	}

	setChildren(children=[]){
		this.children = children
		_.each(this.children, (child)=>{
			child.parent = this
		});
	}

	getLeaves(){
		const leaves = [];
		this.depthFirstTraverse(function(){
			if(!node.children.length){
				leaves.push(node);
			}
		})
		return leaves;
	}

	iterateUp(iteratee){
		iteratee(this)
		let pointer = this
		while(pointer.parent){
			pointer = pointer.parent
			iteratee(pointer, pointer.parent)
		}
	}

	iterateDown(iteratee){
		const nodes = []
		this.iterateUp(function(node){
			nodes.push(node)
		});
		for(var i=nodes.length-1; i>=0; i--){
			iteratee(nodes[i], nodes[i+1])
		}
	}

	depthFirstTraverse(iteratee){
		iteratee(this);
		_.each(this.children, function(child){
			child.depthFirstTraverse(iteratee);
		})
	}

	breadthFirstTraverse(iteratee){
		iteratee(this);

		const stack = this.children.slice();
		const otherStack = [];
		while(stack.length){
			for(let i=0; i<stack.length; i++){
				iteratee(stack[i]);
				[].push.apply(otherStack, stack[i].children);
			}
			stack.length = 0;
			[].push.apply(stack, otherStack);
			otherStack.length=0;
		}
	}

}

module.exports = TreeNode