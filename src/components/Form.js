import React from 'react'

export const Form = ({ cordsType, handleOptionsClick, latRef, longRef, nameRef, handleSubmit }) => {
    const renderCordsInput = () => {
        return (
            <>
                <div className="mb-3">
                    <input className="form-control" ref={latRef} name="lat-input" placeholder="lat" />
                </div>
                <div className="mb-3">
                    <input className="form-control" ref={longRef} name="long-input" placeholder="long" />
                </div>
            </>
        )
    }

    const renderNameInput = () => {
        return (
            <div className="mb-3">
                <input type="text" className="form-control" ref={nameRef} name="name-input" placeholder="enter city name" />
            </div>
        )
    }

    return (
        <>
            <form novalidate className="locations-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="mb-3">
                        <input className="form-check-input m-1" type="radio" checked={cordsType === 'cords'} onChange={handleOptionsClick} defaultChecked name="cords" />
                        <label className="form-check-label" htmlFor="cords"  >Add By Cords</label>
                    </div>
                    <div className="mb-3">
                        <input className="form-check-input m-1" type="radio" checked={cordsType === 'location'} onChange={handleOptionsClick} name="location" />
                        <label className="form-check-label" htmlFor="location">Add By Location</label>

                    </div>
                    {cordsType === 'cords' ? renderCordsInput() : renderNameInput()}

                    <button className="btn btn-primary" type="submit">Submit Coords</button>
                </div>
            </form>
        </>
    )
}
