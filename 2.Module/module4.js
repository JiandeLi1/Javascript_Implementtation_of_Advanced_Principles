export let a = 3;

/*
const is like let, it is a LexicalDeclaration (VariableStatement, Declaration) used to define an identifier in your block.

You are trying to mix this with the default keyword, which expects a HoistableDeclaration, ClassDeclaration or AssignmentExpression to follow it.
*/ 
export default function sum (a,b,c){
    return a+b+c
}