export default (store) => {
  const ability = store.getters.ability
  console.log('ABILITY: ', ability);
  ability.update(store.state.rules)

  return store.subscribe((mutation) => {
    switch (mutation.type) {
    case 'createSession':
      ability.update(mutation.payload.rules)
      break
    case 'destroySession':
      ability.update([{ action: 'read', subject: 'all' }])
      break
    }
  })
}
