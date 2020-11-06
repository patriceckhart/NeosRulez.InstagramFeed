function init() {
    var a = document.querySelectorAll('[data-feed]');
    for (var i in a) if (a.hasOwnProperty(i)) {
        var htmlElement = a[i];
        var feedname = htmlElement.dataset.feed;
        var identifier = htmlElement.id;
        var feedhash = htmlElement.dataset.md5;
        var cols = htmlElement.dataset.cols;
        var posts = htmlElement.dataset.posts;
        getInstagramPictures(feedname).then(function(pictures) {
            var json = JSON.parse(pictures);
            var feedarray = json.slice(0, parseInt(posts));
            ReactDOM.render(
                <InstagramFeed feeddata={feedarray} hash={feedhash} cols={cols} />,document.getElementById(identifier)
            );
        });
    }
}

class InstagramFeedItem extends React.Component {
    render() {
        return (
            <div className={this.props.cols} >
                <div className="neosrulez-instagramfeed-item" >
                    <a href={'https://www.instagram.com/p/' + this.props.post.node.shortcode} target="_blank">
                        {this.props.post.node.thumbnail_src &&
                            <div className="neosrulez-instagramfeed-item-image">
                                <img src={this.props.post.node.thumbnail_src} className="img-fluid" alt={this.props.post.node.shortcode} />
                            </div>
                        }
                        <div className="neosrulez-instagramfeed-item-content-wrapper">
                            {this.props.post.node.location &&
                            <div className="neosrulez-instagramfeed-item-location">
                                <small>
                                    <i className="fas fa-map-marker-alt"></i>
                                    {this.props.post.node.location.name}
                                </small>
                            </div>
                            }
                            <div className="neosrulez-instagramfeed-item-content">
                                {this.props.post.node.edge_media_to_caption.edges[0] &&
                                    <div>
                                        {this.props.post.node.edge_media_to_caption.edges[0].node.text}
                                    </div>
                                }
                            </div>
                            {this.props.post.node.accessibility_caption &&
                                <div className="neosrulez-instagramfeed-item-caption">
                                    <small>
                                        {this.props.post.node.accessibility_caption}
                                    </small>
                                </div>
                            }
                        </div>
                        <div className="row align-items-center">
                            <div className="col-6 text-center">
                                <i className="far fa-heart"></i>
                                <span className="d-block">
                                    {this.props.post.node.edge_liked_by.count}
                                </span>
                            </div>
                            <div className="col-6 text-center">
                                <i className="far fa-comment"></i>
                                <span className="d-block">
                                    {this.props.post.node.edge_media_to_comment.count}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}


class InstagramFeed extends React.Component {
    render() {
        const items = [];
        var feedata = this.props.feeddata;
        var hash = this.props.hash;
        var cols = this.props.cols;
        for (var i in feedata) {
            items.push(<InstagramFeedItem key={i} post={feedata[i]} cols={cols} />);
        }
        document.getElementById('neosrulez__instagramfeed__' + hash + '__preloader').remove();
        return (
            <div className="neosrulez-instagramfeed-item">
                <div className="row">
                    {items}
                </div>
            </div>
        )
    }
}

init();