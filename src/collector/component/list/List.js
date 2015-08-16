import React from "react";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Thumbnail from "react-bootstrap/lib/Thumbnail";

export default class List extends React.Component
{
    render()
    {
        var columns = this.props.children.map( this.renderColumn, this );

        return React.createElement(
            Grid,
            {
                fluid: true
            },
            React.createElement(
                Row,
                null,
                columns
            )
        );
    }

    renderColumn( doc )
    {
        return React.createElement(
            Col,
            {
                key: doc._id,
                xs: 4,
                sm: 2,
                lg: 2
            },
            this.renderItem( doc )
        );
    }

    renderItem( doc )
    {
        var uri = this.props.uri;
        return React.createElement(
            "a",
            {
                href: uri.view( doc )
            },
            this.renderThumbnail( doc )
        );
    }

    renderThumbnail( doc )
    {
        return React.createElement(
            Thumbnail,
            {
                src: doc.image
            },
            this.renderCaption(doc),
            this.renderSubtitle(doc)
        );
    }

    renderCaption( doc ) {
        return React.createElement("h5", null, doc.name);
    }

    renderSubtitle( doc ) {
        var subtitle = this.getSubtitle(doc);
        return React.createElement("h6", null, subtitle );
    }

    getSubtitle( doc ) {
        return doc.season || doc.released || doc.added;
    }
}

List.propTypes = {
};

List.defaultProps = {
};
