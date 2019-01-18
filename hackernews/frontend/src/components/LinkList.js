import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const FEED_QUERY = gql `
  {
    feed {
      links {
        id
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
console.log("has location changed? ", this.props.location, prevProps.location)

class LinkList extends Component {
    
  componentDidUpdate(prevProps) {
    const locationChanged = this.props.location !== prevProps.location;
    console.log("has location changed? ", this.props.location, prevProps.location)
    return locationChanged
  }
  
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
    
          const linksToRender = data.feed.links
    
          return (
            <div>
              {linksToRender.map((link, index )=> <Link key={link.id} link={link} index={index} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList