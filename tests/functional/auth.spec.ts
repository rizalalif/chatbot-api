import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Auth', (group) => {
  // group.setup(async () => {
  //   console.log('runs once before all the tests')
  // })

  group.teardown(async () => {
    const client = Database.connection()
    await client.truncate('messages', true)
    await client.truncate('conversations', true)
    await client.truncate('api_tokens', true)
    await client.truncate('users',true)
  })

  let authenticated: { email: string, password: string, token: string };
  let token: string;

  let conversation: {
    sessionId: string,
    conversationId: string
  }
  const payload = {
    username: "user2",
    email: "user2@gmail.com",
    password: "12345678",
    password_confirmation: "12345678"
  }

  test('(POST /register) register', async ({ client, assert }) => {
    const response = await client.post('/api/register').json(payload)
    const body = response.body().data


    response.dumpBody()
    response.assertStatus(200)
    assert.containsSubset(body, { email: payload.email, username: payload.username })

    // authenticated = {
    //   email: body.email,
    //   // password: body.password,
    //   token: ''
    // }
  })

  test('(POST /login) user1 (/login)', async ({ client, assert }) => {
    await client.post('/api/register').json(payload)
    // const bodyRegister = registerResponse.body().data

    console.log(payload);

    const response = await client.post('/api/login').json({ email: payload.email, password: payload.password })
    const body = response.body().data
    // console.log(response.body().data.token.token);
    authenticated = {
      email: payload.email,
      password: payload.password,
      token: body.token.token
    }
    response.dumpBody()
    // token = body.token.token

    response.assertStatus(200)

  })

  test('(POST /conversation/question) start new conversation', async ({ client, assert }) => {
    const response = await client.post('/api/conversation/question')
      .header('Authorization', `Bearer ${authenticated.token}`)
      .json({ message: "halo (testing)" })
    const body = response.body().data
    conversation = {
      sessionId: body.sessionId,
      conversationId: ''
    }
    response.dumpBody()
    response.assertStatus(200)
    assert.isString(body.sessionId)
    assert.isString(body.AI)
  }).setup(() => {

  })

  test('(POST /conversation/question) start existing conversation', async ({ client, assert }) => {
    const response = await client.post(`/api/conversation/${conversation.sessionId}/question`)
      .header('Authorization', `Bearer ${authenticated.token}`)
      .json({ message: "siapa anda (testing exist)?" })
    const body = response.body().data

    response.dumpBody()
    response.assertStatus(200)
    assert.isString(body.sessionId)
    assert.isString(body.AI)
  })

  test('(GET /conversation/:sessionId) get chat in conversation by session', async ({ client, assert }) => {
    const response = await client.get(`/api/conversation/${conversation.sessionId}`)
      .header('Authorization', `Bearer ${authenticated.token}`)
    const body = response.body().data.data

    response.dumpBody()
    response.assertStatus(200)
    assert.lengthOf(body, 4)
  })

  test('(GET /conversation) get all conversatoin session', async ({ client, assert }) => {
    const response = await client.get('/api/conversation')
      .header('Authorization', `Bearer ${authenticated.token}`)

    const body = response.body().data

    response.dumpBody()
    response.assertStatus(200)
    assert.lengthOf(body, 1)
  })


  test('(delete /conversation/:id/delete) delete conversation', async ({ client, assert }) => {
    const response = await client.get(`/api/conversation/${conversation.conversationId}`)
      .header('Authorization', `Bearer ${authenticated.token}`)


    response.dumpBody()
    response.assertStatus(200)
  })


})
