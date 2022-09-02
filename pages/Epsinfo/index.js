import React from "react";
import SEO from "../../components/seo";
import Axios from "../../components/apiRequest/Axios";
import DefaultLayout from "../../components/DefaultLayout";
import PostTemplate from "../../utils/PostTemplate";

export default class App extends React.Component {
  static async getInitialProps({ query: { page = 1 } }) {
     try {
      const resp = await Axios({method: "get", url: `/epsinfo/limit=${(page-1)*5}`})
      const resp1 = await Axios({method: "get", url: "/epsinfo"})
      return {
        items: await resp.data,
        recentpost: await resp1.data.sort((a, b) => b.id - a.id).slice(0,4),
        page: parseInt(page, 10)
      }
     } catch (error) {
      return {
        err: "Error: not connected. Please check your Internet connection and try"
      }
     }
  }
  render() {
    return (
      <DefaultLayout>
          <SEO
             title='Thông tin eps'
             description='d'
             imgUrl=''
          />
        {(this.props.items&&this.props.recentpost)?
        <PostTemplate
            post={this.props.items}
            parentPage='/Epsinfo'
            title="Thông tin EPS"
            recentpost={this.props.recentpost}
            disabled={this.props.items.length}
            page={this.props.page}
            imgURL="eps"
          />:this.props.err}
      </DefaultLayout>
    )
  }
}