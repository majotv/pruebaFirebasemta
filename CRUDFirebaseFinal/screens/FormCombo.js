import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert, Button } from 'react-native'
import { Input } from 'react-native-elements';
import { ServicioCombo } from '../servicios/ServicioCombo';


export default class FormCombo extends Component {
    constructor(props) {
        super(props);
        /*this.origen = this.props.route.params.origen;
        this.persona = this.props.route.params.persona;
        if (this.persona != null) {
            this.state = {
                id: this.persona.id,
                nombre: this.persona.nombre,
                apellido: this.persona.apellido,
                telefono: this.persona.telefono
            }
        } else {*/
            this.state = {
                idCombo: '',
                cantidad:0,
                idProd:'',
                cantidadProd: 0,
                unidad: '',
                precio: 0
            }
        //}
    }

    render() {
        return <View>
          <Input
                value={this.state.idCombo}
                placeholder="Nombre Combo"
                label="Nombre Combo"
                onChangeText={(text) => { this.setState({ idCombo: text }) }}
            />
            <Input
                value={this.state.cantidad}
                placeholder="Cantidad"
                label="Cantidad"
                onChangeText={(text) => { this.setState({ cantidad: text }) }}
            />

            <Button
                title="Guardar"
               /* onPress={() => {
                    console.log("Datos"+this.state.idCombo+" "+this.state.cantidad);
                }}*/
                onPress={() => {
                    let servCombo=new ServicioCombo();
                    servCombo.crear({
                        id:       this.state.idCombo,
                        cantidad: this.state.cantidad
                    });
                    //console.log("Datos"+id+" "+cantidad);
                  //  this.props.navigation.goBack()
                }}
            />

            <Input
                value={this.state.idProd}
                placeholder="Nombre Producto"
                label="Nombre Producto"
                onChangeText={(text) => { this.setState({ idProd: text }) }}
            />
            <Input
                value={this.state.cantidadProd}
                placeholder="Cantidad Producto"
                label="Cantidad Producto"
                onChangeText={(text) => { this.setState({ cantidadProd: text }) }}
            />
            <Input
                value={this.state.unidad}
                placeholder="Unidad"
                label="Unidad"
                onChangeText={(text) => { this.setState({ unidad: text }) }}
            />
            <Input
                value={this.state.precio}
                placeholder="Precio"
                label="Precio"
                onChangeText={(text) => { this.setState({ precio: text }) }}
            />
            <Button
                title="Guardar"
                /*onPress={() => {
                    console.log("Datos"+this.state.idProd+" "+this.state.cantidadProd+" "+this.unidad+" "+this.precio);
                }}*/
                onPress={() => {
                    let servCombo=new ServicioCombo();
                    servCombo.crearComboProducto({
                        id:            this.state.idCombo,
                        idProd:        this.state.idProd,
                        cantidadProd:  this.state.cantidadProd ,
                        unidad:        this.state.unidad,
                        precio:        this.state.precio
                    });
                }}
            />

        </View>
    }
}