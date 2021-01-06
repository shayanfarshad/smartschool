import React,{Component} from 'react';
import {View} from 'react-native'
import TocFlatItem from './flatItem';

class FlatToc extends Component{
    render(){
        const List = this.props.layers ? this.props.layers.map((item,index)=>{
            return(
                <TocFlatItem
                    key={index}
                    Label={item[this.props.LabelSelector]}
                    OnLeftPress={()=>this.props.OnZoomPress(item[this.props.IdSelector])}
                    Img={item[this.props.ImgSelector]}
                    onPress={()=>this.props.onPress(item[this.props.IdSelector])}
                    Selcted={item[this.props.CheckedSelector]}
                />
            )
        }) : <View></View>

        return(
            <>
                {List}
            </>
        )
    }
}


export default FlatToc;