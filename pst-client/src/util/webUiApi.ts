/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface WebUiApiCreateCityDto {
  name: string
  description: string
  active: boolean
}

export interface WebUiApiCity {
  name: string
  description: string
  active: boolean
  id: number
}

export type WebUiApiUpdateCityDto = object

export interface WebUiApiCreateRoleDto {
  name: object
}

export interface WebUiApiCreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  address: string
  city: string
  state: string
  /**
   * @minLength 5
   * @maxLength 10
   */
  zipCode: string
  country: string
  active: boolean
  roles: WebUiApiCreateRoleDto[]
}

export interface WebUiApiAgent {
  name: string
  description: string
  logo: string
  user: WebUiApiUser
  id: number
}

export interface WebUiApiUser {
  /**
   * Provide the email of the user
   * @example "jane_doe@gmail.com"
   */
  email: string
  /**
   * Provide the password of the user
   * @example "test123#@"
   */
  password: string
  /**
   * Provide the first name of the user
   * @example "Jane"
   */
  firstName: string
  /**
   * provide the lastName of the user
   * @example "Doe"
   */
  lastName: string
  /**
   * Provide the phone of the user
   * @example "0745654645"
   */
  phone: string
  /**
   * Provide the address of the user
   * @example "Address"
   */
  address: string
  /**
   * Provide the city
   * @example "City"
   */
  city: string
  /**
   * Provide the state
   * @example "State"
   */
  state: string
  /**
   * Provide the zipcode of the user
   * @example "540475"
   */
  zipCode: string
  /**
   * Provide the country of the user
   * @example "Romania"
   */
  country: string
  apiKey: string
  active: boolean
  roles: WebUiApiRole[]
  agent: WebUiApiAgent | null
  id: number
}

export interface WebUiApiRole {
  name: string
  users: WebUiApiUser[]
  id: number
}

export type WebUiApiUpdateUserDto = object

export interface WebUiApiCreateEstateDto {
  /**
   * @minLength 5
   * @maxLength 100
   */
  name: string
  type: object
}

export interface WebUiApiEstate {
  name: string
  type: string
  comments: WebUiApiComment[]
  id: number
}

export interface WebUiApiComment {
  content: string
  estate: WebUiApiEstate
  id: number
}

export interface WebUiApiCreateCommentDto {
  content: string
}

export interface WebUiApiUpdateEstateDto {
  comments: WebUiApiCreateCommentDto[]
}

export interface WebUiApiLoginDto {
  /**
   * Email for login
   * @example "test5@yahoo.com"
   */
  email: string
  /**
   * Password
   * @example "1234567"
   */
  password: string
}

export interface WebUiApiCreateAgentDto {
  /**
   * @minLength 5
   * @maxLength 100
   */
  name: string
  description: string
  logo: string
  user: WebUiApiUser
}

export type WebUiApiUpdateAgentDto = object

export interface WebUiApiCitiesControllerFindAllParams {
  page: number
  limit: number
  searchQuery?: string
  sortBy?: string
  sortOrder?: string
}

export interface WebUiApiEstatesControllerFindAllParams {
  search: string
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
        },
        signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
        body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Property Share Trade
 * @version 1.0
 * @contact
 *
 * The Property Share Trade Api documentation. For JSON version, visit [here](/api-json)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name AppControllerGetHello
   * @request GET:/
   */
  appControllerGetHello = (params: RequestParams = {}) =>
    this.request<string, any>({
      path: `/`,
      method: 'GET',
      format: 'json',
      ...params
    })

  profile = {
    /**
     * No description
     *
     * @name AppControllerGetProfile
     * @request GET:/profile
     * @secure
     */
    appControllerGetProfile: (params: RequestParams = {}) =>
      this.request<WebUiApiUpdateCityDto, any>({
        path: `/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  }
  myEstates = {
    /**
     * No description
     *
     * @name AppControllerGetMyEstates
     * @request GET:/my-estates
     * @secure
     */
    appControllerGetMyEstates: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/my-estates`,
        method: 'GET',
        secure: true,
        ...params
      })
  }
  cities = {
    /**
     * No description
     *
     * @tags cities
     * @name CitiesControllerCreate
     * @request POST:/cities
     */
    citiesControllerCreate: (data: WebUiApiCreateCityDto, params: RequestParams = {}) =>
      this.request<WebUiApiCity, any>({
        path: `/cities`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Retrieve a paginated list of cities with optional filtering and sorting
     *
     * @tags cities
     * @name CitiesControllerFindAll
     * @summary Retrieve paginated list of cities
     * @request GET:/cities
     */
    citiesControllerFindAll: (
      query: WebUiApiCitiesControllerFindAllParams,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/cities`,
        method: 'GET',
        query: query,
        ...params
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesControllerFindOne
     * @request GET:/cities/{id}
     */
    citiesControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiCity, any>({
        path: `/cities/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesControllerUpdate
     * @request PATCH:/cities/{id}
     */
    citiesControllerUpdate: (id: string, data: WebUiApiUpdateCityDto, params: RequestParams = {}) =>
      this.request<WebUiApiCity, any>({
        path: `/cities/${id}`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags cities
     * @name CitiesControllerRemove
     * @request DELETE:/cities/{id}
     */
    citiesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiCity, any>({
        path: `/cities/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      })
  }
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersControllerCreate
     * @request POST:/users
     * @secure
     */
    usersControllerCreate: (data: WebUiApiCreateUserDto, params: RequestParams = {}) =>
      this.request<WebUiApiUser, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerFindAll
     * @request GET:/users
     * @secure
     */
    usersControllerFindAll: (params: RequestParams = {}) =>
      this.request<WebUiApiUser[], any>({
        path: `/users`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerFindOne
     * @request GET:/users/{id}
     * @secure
     */
    usersControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiUser, any>({
        path: `/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerUpdate
     * @request PATCH:/users/{id}
     * @secure
     */
    usersControllerUpdate: (id: string, data: WebUiApiUpdateUserDto, params: RequestParams = {}) =>
      this.request<WebUiApiUser, any>({
        path: `/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersControllerRemove
     * @request DELETE:/users/{id}
     * @secure
     */
    usersControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}`,
        method: 'DELETE',
        secure: true,
        ...params
      })
  }
  estates = {
    /**
     * No description
     *
     * @tags estates
     * @name EstatesControllerCreate
     * @request POST:/estates
     * @secure
     */
    estatesControllerCreate: (data: WebUiApiCreateEstateDto, params: RequestParams = {}) =>
      this.request<WebUiApiEstate, any>({
        path: `/estates`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags estates
     * @name EstatesControllerFindAll
     * @request GET:/estates
     * @secure
     */
    estatesControllerFindAll: (
      query: WebUiApiEstatesControllerFindAllParams,
      params: RequestParams = {}
    ) =>
      this.request<WebUiApiEstate[], any>({
        path: `/estates`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags estates
     * @name EstatesControllerFindOne
     * @request GET:/estates/{id}
     * @secure
     */
    estatesControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<WebUiApiEstate, any>({
        path: `/estates/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags estates
     * @name EstatesControllerUpdate
     * @request PATCH:/estates/{id}
     * @secure
     */
    estatesControllerUpdate: (
      id: string,
      data: WebUiApiUpdateEstateDto,
      params: RequestParams = {}
    ) =>
      this.request<WebUiApiEstate, any>({
        path: `/estates/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags estates
     * @name EstatesControllerRemove
     * @request DELETE:/estates/{id}
     * @secure
     */
    estatesControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiEstate, any>({
        path: `/estates/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  }
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerSignup
     * @summary Register new user
     * @request POST:/auth/signup
     */
    authControllerSignup: (data: WebUiApiCreateUserDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login user
     * @request POST:/auth/login
     */
    authControllerLogin: (data: WebUiApiLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params
      })
  }
  agents = {
    /**
     * No description
     *
     * @tags agents
     * @name AgentControllerCreate
     * @request POST:/agents
     * @secure
     */
    agentControllerCreate: (data: WebUiApiCreateAgentDto, params: RequestParams = {}) =>
      this.request<WebUiApiAgent, any>({
        path: `/agents`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags agents
     * @name AgentControllerFindAll
     * @request GET:/agents
     * @secure
     */
    agentControllerFindAll: (params: RequestParams = {}) =>
      this.request<WebUiApiAgent[], any>({
        path: `/agents`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags agents
     * @name AgentControllerFindOne
     * @request GET:/agents/{id}
     * @secure
     */
    agentControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiAgent, any>({
        path: `/agents/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags agents
     * @name AgentControllerUpdate
     * @request PATCH:/agents/{id}
     * @secure
     */
    agentControllerUpdate: (id: string, data: WebUiApiUpdateAgentDto, params: RequestParams = {}) =>
      this.request<WebUiApiAgent, any>({
        path: `/agents/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags agents
     * @name AgentControllerRemove
     * @request DELETE:/agents/{id}
     * @secure
     */
    agentControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<WebUiApiAgent, any>({
        path: `/agents/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  }
}
