import { render, screen } from "@testing-library/react"
import { useSession } from "next-auth/react"
import Home, { getStaticProps } from "../../pages"
import stripe from "../../services/stripe"

jest.mock('next-auth/react')
jest.mock('../../services/stripe')

describe('Home Page', () => {
  it('Should render correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated"
    })

    render(
      <Home product={{
        priceId: 'fake-priceId',
        amount: 'R$ 10,00'
      }} />
    )

    expect(screen.getByText('for R$ 10,00 month')).toBeInTheDocument()
  })

  it('Loads inicital data', async () => {
    const retrieveStripePricesMocked = jest.mocked(stripe.prices.retrieve)
    
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: 'R$\xa010,00'
          }
        }
      })
    )
  })
})