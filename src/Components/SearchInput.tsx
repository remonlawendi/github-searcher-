import React, { FormEvent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResultsIfNeeded, selectQuery } from '../Actions'
import { GHEntity } from '../Types'
import useDebounce from '../Hooks/useDebounce'

const Container = styled.div`

`

const Input = styled.input`
margin: 5px;
border-radius: 0;
padding: 6px;
border: 1px solid gainsboro;
`
const EntitySelector = styled.select`
border: 1px solid gainsboro;
padding: 6px;
background: white;
margin: 5px;
`
const Entity = styled.option`

`

export const SearchInput = () => {
    const dispatch = useDispatch()
    const state = useSelector<any, any>(state => state.resultsByQuery)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedEntity, setSelectedEntity] = useState(GHEntity.USERS)
    const debouncedSearchTerm = useDebounce(searchTerm)
    useEffect(() => {
      dispatch(selectQuery(debouncedSearchTerm, selectedEntity))
      dispatch(fetchResultsIfNeeded(debouncedSearchTerm, selectedEntity))
    }, [debouncedSearchTerm, dispatch, selectedEntity])
    useEffect(() => {
      // no-need to wait for debounce when we have a saved record
      if (state[selectedEntity] && state[selectedEntity][searchTerm]) {
        dispatch(selectQuery(searchTerm, selectedEntity))
        dispatch(fetchResultsIfNeeded(searchTerm, selectedEntity))
      }
    }, [dispatch, searchTerm, selectedEntity, state])
    const onChangeQuery = (e: FormEvent<HTMLInputElement>) => {
      if(e.currentTarget.value?.length >= 3 || e.currentTarget.value?.length === 0) setSearchTerm(e.currentTarget.value)
    }
    const onChangeEntity= (e: FormEvent<HTMLSelectElement>) => {
      setSelectedEntity(e.currentTarget.value as GHEntity)
    }
    return <Container>
    <Input placeholder="Start typing to search.. " onChange={onChangeQuery}></Input>
    <EntitySelector data-testid="entity" onChange={onChangeEntity}>
      <Entity value={GHEntity.USERS}>User</Entity>
      <Entity value={GHEntity.REPOSITORIES}>Repository</Entity>
      <Entity value={GHEntity.ISSUES}>Issue</Entity>
    </EntitySelector>
    </Container>
}