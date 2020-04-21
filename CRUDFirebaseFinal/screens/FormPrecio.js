import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Button,FlatList,Picker } from 'react-native'
import { Input ,Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import {ServicioPrecios} from '../servicios/ServicioPrecios'
import {ItemPrecio} from '../componentes/ItemPrecio'

export  class FormPrecio extends Component {
    constructor(props) {
        super(props);
        let precios = [];

        this.origen = this.props.route.params.origen;
        this.idProducto = this.props.route.params.idProducto;
        this.precio = this.props.route.params.precio;
        this.pintarBoton = false;
        if (this.origen=="nuevo"){
            this.pintarBoton = true;
        }
        if (this.precio != null && this.origen=='actualizar') {
            this.state = {
                id: this.idProducto,
                idPrecio: this.precio.id,
                cantidad: this.precio.cantidad,
                precio: this.precio.precio,               
                valorSeleccionado: this.precio.unidad,
                validarPrecio:'',
                validarUnidadPrecio:'',
                validarCantidadPrecio:'',
            }
            
            let srvPrecios=new ServicioPrecios();
            srvPrecios.registrarEscuchaTodas(precios, this.repintarLista, this.idProducto);

        } else {
       this.state = {
                id: this.idProducto, 
                idPrecio: '',
                cantidad: '',
                precio: '',  
                valorSeleccionado: 'Kg',
                validarPrecio:'',
                validarUnidadPrecio:'',
                validarCantidadPrecio:'',
            }
        }
        
    }
    repintarLista = (precios) => {
        this.setState({
            listPrecios: precios
        })
    }
   guardarPrecio=()=>{
    let servPrecios = new ServicioPrecios();
    let validar=true;
    this.validarCantidadPrecio='';
    this.validarUnidadPrecio='';
    this.validarPrecio='';

    //Validaciones    
    if(this.state.cantidad==='' || this.state.cantidad===undefined)
    {
        this.setState({validarCantidadPrecio:'Cantidad del Precio Requerido'})
        validar=false;
       
    }  
    if(this.state.valorSeleccionado==='' || this.state.valorSeleccionado===undefined)
    {
        this.setState({validarUnidadPrecio:'Unidad del Precio Requerido'})
        validar=false;
       
    } 
    if(this.state.precio==='' || this.state.precio===undefined)
    {
        this.setState({precio:'Precio Requerido'})
        validar=false;
       
    }   
  //Si pasa todas las validaciones crea el producto
    if(validar===true)
    {
       servPrecios.crearProductoPrecio(this.idProducto,
        {            
            idPrecio: this.state.valorSeleccionado + this.state.cantidad,
            cantidad: this.state.cantidad,
            precio: this.state.precio,
            unidad: this.state.valorSeleccionado,
        }
        );
        this.props.navigation.goBack()
    }
 }

 actualizarPrecio=()=>{
    let servPrecios = new ServicioPrecios();
    let validar=true;
    this.validarNombrePrecio='';

    if(this.state.idPrecio==='' || this.state.idPrecio===undefined)
    {
        this.setState({validarNombrePrecio:'Precio Requerido'})
        validar=false;
       
    }    
  //Si pasa todas las validaciones crea el producto  
    if(validar===true)
    {
       servPrecios.actualizar({
            idPrecio: this.state.idPrecio,
            cantidad: this.state.cantidad,
            precio: this.state.precio,
            unidad: this.state.valorSeleccionado
        
        });
        this.props.navigation.goBack()
    }
 }
 
    eliminarPrecio=(codPrecio)=>{
        let servPrecios = new ServicioPrecios();
        servPrecios.eliminar(this.state.id, codPrecio);
    }
    
    render() {
        return <View>
            <Input
                errorMessage={this.state.validarCantidadPrecio}
                leftIcon={
                    <Icon
                      name='shopping-cart'
                      size={24}
                      color='black'
                    />}
                value={this.state.cantidad}
                placeholder="Cantidad"
                
                onChangeText={(text) => { this.setState({ cantidad: text }) }}
            />

            <Input
                errorMessage={this.state.validarPrecio}
                leftIcon={
                    <Icon
                      name='money'
                      size={24}
                      color='black'
                    />}
                value={this.state.precio}
                placeholder="Precio"
                
                onChangeText={(text) => { this.setState({ precio: text }) }}
            />

            <View>
                <Text style={styles.headline} >Escoja la Unidad </Text>
                <Picker selectedValue = {this.state.valorSeleccionado} 
                    onValueChange = {(valor, index)=>{this.setState({valorSeleccionado:valor})}}>
                    <Picker.Item label="Unidades" value="uni"  />
                    <Picker.Item label="Gramos" value="gr" />
                    <Picker.Item label="Kilos" value="kg" />
                    <Picker.Item label="Libras" value="lbs" />
                    <Picker.Item label="Quintal" value="qq" />
                    <Picker.Item label="Caja" value="caja" />
                </Picker>
                <Text>{this.valorSeleccionado}</Text>
            </View>
            
            { this.pintarBoton && 
            <Button
                title="Guardar"
                onPress={ this.guardarPrecio          
                }
            />
            }
            { !this.pintarBoton && 
            <Button
                title="Actualizar"
                onPress={ this.actualizarPrecio              
                }
            />
             }
        { !this.pintarBoton && 
        <View > 
            <Text style={styles.headline} >Lista de Precios </Text>
            <FlatList                
                data = {this.state.listPrecios}
                renderItem = {(objeto)=>{return (<ItemPrecio precio1={objeto.item}
                                                            fnEliminarPrecio={this.eliminarPrecio}
                                                            fnActualizar={this.actualizarPrecio}
                />);
            }}
                keyExtractor = {(objetoPrecio)=>{return objetoPrecio.idPrecio}}
            />
        <ActionButton
            onPress={() => { this.props.navigation.navigate("ListPrecioScreen",{ origen: "nuevo" }) }}
          />
        </View> 
        }
        
        </View>
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});