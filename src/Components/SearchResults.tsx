import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { GHRepo, GHEntity } from '../Types'
import { isNull, isUndefined } from 'util'
import { FaStar, FaEye, FaCircle } from 'react-icons/fa'

const SearchResult = styled.div`
  font-family: IBM Plex Mono;
  a {
    text-decoration: underline;
    color: #333;
    padding: 5px;
  }
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  width: 30%;
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
  h4 {
    font-size: 12px;
    font-family: IBM Plex Sans;
    font-weight: 300;
    margin: 5px;
  }
  min-width: 200px;
  background: #FFF;
  box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.25);
  height: 200px;
  margin: 4px;
  align-content: center;
  border-radius: 12px;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  align-content: center;
  overflow: hidden;
`
const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`
const CardTop = styled.div`
  display: flex;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(90deg, #FF0000 2.55%, #FF7A00 99.99%, #FF7A00 100%);
  color: white;
  & a {
    color: white;
  }
  padding: 10px;
`
const CardBody = styled.div`
  padding: 10px;
`

const Loading = () => <div>Loading...</div>
const Empty = () => <div>Empty</div>

export const SearchResults = () => {
  const selectedQuery = useSelector<any, any>(state => state.selectedQuery)
  const selectedEntity = useSelector<any, any>(state => state.selectedEntity)
  const resultsByQuery = useSelector<any, any>(state => state.resultsByQuery)
  const [results, setResults] = useState<any>(null)
  useEffect(() => {
    if(resultsByQuery && resultsByQuery[selectedEntity] && resultsByQuery[selectedEntity][selectedQuery]) {
      setResults(resultsByQuery[selectedEntity][selectedQuery])
    } else {
      setResults(null)
    }
  }, [selectedQuery, resultsByQuery, selectedEntity])
   return <Container>
     {(!isNull(results) && results?.items?.length === 0) && <Empty/> }
     {(isNull(results)) && <Loading />}
     {results?.items?.map((item: any) => {
         return  <SearchResult key={item.id}>
           {
             selectedEntity === GHEntity.ISSUES && <>
             <CardTop>
              <Avatar src={item?.user?.avatar_url}></Avatar><a href={item.html_url}>{item.title}</a>
             </CardTop>
             <CardBody>
              <a href={item.repository_url}>{item.title}</a>
              <h4>By: {item?.user?.login || '-'}</h4>
             </CardBody>
             </>
           }
          {
             selectedEntity === GHEntity.REPOSITORIES && <>
            <CardTop>
              <Avatar src={item?.owner?.avatar_url}></Avatar><a href={item.html_url}>{item.full_name}</a>
            </CardTop>
            <CardBody>
             <h4>user: {item?.owner?.login}</h4>
             <p><FaStar /> {item?.stargazers_count || '-'}</p>
             <p><FaEye />: {item?.watchers || '-'}</p>
             <p>count: {item?.count || '-'}</p>
             <p><FaCircle />: {item?.language || '-'}</p>
            </CardBody>
             </>
           }
           {
             selectedEntity === GHEntity.USERS && <>
            <CardTop>
            <Avatar src={item?.avatar_url}></Avatar>
             <a href={item.html_url}>{item.login}</a>
            </CardTop>
             </>
           }
         </SearchResult>
       })
     }
   </Container> 
}