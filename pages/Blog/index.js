import React from "react";
import SEO from "../../components/seo";
import Axios from "../../components/apiRequest/Axios";
import DefaultLayout from "../../components/DefaultLayout";
import PostTemplate from "../../utils/PostTemplate";

export default class App extends React.Component {
  static async getInitialProps({ query: { page = 1 } }) {
    const resp = await Axios({method: "get", url: `/blog/limit=${(page-1)*5}`})
    const resp1 = await Axios({method: "get", url: "/blog"})
    return {
      items: await resp.data,
      recentpost: await resp1.data.sort((a, b) => b.id - a.id).slice(0,4),
      page: parseInt(page, 10)
    }
  }
  render() {
    return (
      <DefaultLayout>
          <SEO
             title='Blog - Chia sẻ'
             description='d'
             imgUrl=''
          />
          <PostTemplate
            post={this.props.items}
            parentPage='/Blog'
            title="Blog - Chia sẻ"
            recentpost={this.props.recentpost}
            disabled={this.props.items.length}
            page={this.props.page}
            imgURL="blog"
          />
      </DefaultLayout>
    )
  }
}