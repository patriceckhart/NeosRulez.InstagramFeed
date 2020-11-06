var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function initInstagramFeed() {
    var a = document.querySelectorAll('[data-feed]');
    for (var i in a) {
        if (a.hasOwnProperty(i)) {
            var htmlElement = a[i];
            var feedname = htmlElement.dataset.feed;
            var identifier = htmlElement.id;
            var feedhash = htmlElement.dataset.md5;
            var cols = htmlElement.dataset.cols;
            var posts = htmlElement.dataset.posts;
            getInstagramPictures(feedname).then(function (pictures) {
                var json = JSON.parse(pictures);
                var feedarray = json.slice(0, parseInt(posts));
                ReactDOM.render(React.createElement(InstagramFeed, { feeddata: feedarray, hash: feedhash, cols: cols }), document.getElementById(identifier));
            });
        }
    }
}

var InstagramFeedItem = function (_React$Component) {
    _inherits(InstagramFeedItem, _React$Component);

    function InstagramFeedItem() {
        _classCallCheck(this, InstagramFeedItem);

        return _possibleConstructorReturn(this, (InstagramFeedItem.__proto__ || Object.getPrototypeOf(InstagramFeedItem)).apply(this, arguments));
    }

    _createClass(InstagramFeedItem, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: this.props.cols },
                React.createElement(
                    'div',
                    { className: 'neosrulez-instagramfeed-item' },
                    React.createElement(
                        'a',
                        { href: 'https://www.instagram.com/p/' + this.props.post.node.shortcode, target: '_blank' },
                        this.props.post.node.thumbnail_src && React.createElement(
                            'div',
                            { className: 'neosrulez-instagramfeed-item-image' },
                            React.createElement('img', { src: this.props.post.node.thumbnail_src, className: 'img-fluid', alt: this.props.post.node.shortcode })
                        ),
                        React.createElement(
                            'div',
                            { className: 'neosrulez-instagramfeed-item-content-wrapper' },
                            this.props.post.node.location && React.createElement(
                                'div',
                                { className: 'neosrulez-instagramfeed-item-location' },
                                React.createElement(
                                    'small',
                                    null,
                                    React.createElement('i', { className: 'fas fa-map-marker-alt' }),
                                    this.props.post.node.location.name
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'neosrulez-instagramfeed-item-content' },
                                this.props.post.node.edge_media_to_caption.edges[0] && React.createElement(
                                    'div',
                                    null,
                                    this.props.post.node.edge_media_to_caption.edges[0].node.text
                                )
                            ),
                            this.props.post.node.accessibility_caption && React.createElement(
                                'div',
                                { className: 'neosrulez-instagramfeed-item-caption' },
                                React.createElement(
                                    'small',
                                    null,
                                    this.props.post.node.accessibility_caption
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'row align-items-center' },
                            React.createElement(
                                'div',
                                { className: 'col-6 text-center' },
                                React.createElement('i', { className: 'far fa-heart' }),
                                React.createElement(
                                    'span',
                                    { className: 'd-block' },
                                    this.props.post.node.edge_liked_by.count
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-6 text-center' },
                                React.createElement('i', { className: 'far fa-comment' }),
                                React.createElement(
                                    'span',
                                    { className: 'd-block' },
                                    this.props.post.node.edge_media_to_comment.count
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return InstagramFeedItem;
}(React.Component);

var InstagramFeed = function (_React$Component2) {
    _inherits(InstagramFeed, _React$Component2);

    function InstagramFeed() {
        _classCallCheck(this, InstagramFeed);

        return _possibleConstructorReturn(this, (InstagramFeed.__proto__ || Object.getPrototypeOf(InstagramFeed)).apply(this, arguments));
    }

    _createClass(InstagramFeed, [{
        key: 'render',
        value: function render() {
            var items = [];
            var feedata = this.props.feeddata;
            var hash = this.props.hash;
            var cols = this.props.cols;
            for (var i in feedata) {
                items.push(React.createElement(InstagramFeedItem, { key: i, post: feedata[i], cols: cols }));
            }
            document.getElementById('neosrulez__instagramfeed__' + hash + '__preloader').remove();
            return React.createElement(
                'div',
                { className: 'neosrulez-instagramfeed-item' },
                React.createElement(
                    'div',
                    { className: 'row' },
                    items
                )
            );
        }
    }]);

    return InstagramFeed;
}(React.Component);

initInstagramFeed();