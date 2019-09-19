import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getProvinceList } from "../../store/actions/province"
import Error from "../cards/error"
import PlaceBox from "../cards/placebox"
import Loader from 'react-loader-spinner'


class ProvincesList extends Component {

    state = {
        'counter': 0
    }

    componentDidMount() {

        // if not has all provinces
        if (!this.props.province_list_status) this.props.getProvinceList()
    }

    render() {

        let listBlock = null

        if (this.props.province_list_isLoading) {
            listBlock = <div className="col s12 center">
                <Loader type="ThreeDots" color="#01579b" height={50} width={50} />
            </div>
        } else {
            listBlock = this.props.provinceList.map(province => {
                return <PlaceBox
                    imgUrl={province.featureImage}
                    key={province.pk}
                    id={province.pk}
                    englishName={province.englishName}
                    mapUrl={province.mapUrl}
                    divClasName="s12 m4" />
            })
        }

        return (
            <div className="container">
                {!this.props.province_list_status && (<div className="row">
                    <Error errName="Provinces Not Found" />
                </div>)}
                <div className="row">
                    {listBlock}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        "provinceList": state.provinceR.provinces_data,
        "province_list_status": state.provinceR.status,
        "province_list_isLoading": state.provinceR.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        "getProvinceList": () => dispatch(getProvinceList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvincesList)