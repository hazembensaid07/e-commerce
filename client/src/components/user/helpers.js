import React  from 'react'
export const getName = ({match}) =>{
    console.log('new helper name',)
    return (match.params.name)
}