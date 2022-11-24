import React from 'react'
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './index.scss';




export default function GioiThieu() {
	
	return (
		<Box className="wrapper-product-detail wrapper-news">
			<Box sx={{ width: '100%', display: { xs: 'none', sm: 'inline-block' } }}>
				<div className="breadcrumb_background">
					<div className="title_full">
						<div className="container a-center">
							<Typography sx={{ display: { sm: 'none', md: 'inline-block' } }} className="title_page">Giới thiệu</Typography>
						</div>
					</div>
				</div>
			</Box>
			<Container sx={{ pt: { xs: 0, sm: 5 }, top: '160px', position: { xs: 'absolute', sm: 'unset' } }}>
				<Breadcrumbs sx={{ mb: 2 }} aria-label="breadcrumb" className="breadcrumb">
					<Link to="#" className="tag-a">Trang chủ</Link>
					<Link to="#" className="tag-a">Giới thiệu</Link>
				</Breadcrumbs>
				<Grid className="news-write-info" container direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 5 }} sx={{ my: 3 }}>
					<Grid item xs={12} md={12} order={{ xs: 1, md: 2 }}>
						<Box className="news-details">
							<Typography className="title" variant="h7"><h3  className="tag-a">Giới thiệu</h3></Typography>
							<Box className="news-content">
								<p>
									Trong cuộc sống hiện đại ngày nay, quá trình toàn cầu hóa đã và đang diễn ra mạnh mẽ trên thế giới nói chung và tại Việt Nam nói riêng. Trước sự phát triển mạnh mẽ vượt bậc đó, thị trường bất động sản ở Việt Nam ra đời nhằm đáp ứng nhu cầu hội nhập kinh tế quốc tế. Cũng chính vì lý do đó, Công Ty Cổ Phần Đầu Tư Delta Platinum đã ra đời dựa trên tầm nhìn và chiến lược phát triển của thị trường Bất động sản Việt Nam.
								</p>
								<br />
								<p>
									Với sự dẫn dắt đầy tận tâm của ban Lãnh đạo dày dạn kinh nghiệm trong ngành cùng với đội ngũ nhân viên trẻ, đầy nhiệt huyết và năng động, chịu khó ham học hỏi Công ty Cổ phần Đầu tư Delta Platinum đã dần tạo được vị thế của mình trên thương trường cũng như trên thị trường Bất động sản Việt Nam. Chúng tôi tự hào khi mang đến cho khách hàng những dự án, sản phẩm với chất lượng tốt nhất để lại ấn tượng sâu sắc trong lòng khách hàng.
								</p>
								<br />
								<p>
									Công ty Cổ phần đầu tư Delta Platinum luôn tâm niệm rằng niềm tin của khách hàng chính là đích đến của sự thành công. Ngoài ra góp phần vào sự thành công đó chính là chất lượng sản phẩm, dịch vụ và đạo đức kinh doanh. Tất cả những điều đó đều được xem là nền tảng vững chắc để công ty bất động sản Delta Platinum phát triển lâu dài, tạo dựng niềm tin tuyệt đối đối với quý khách hàng và đối tác.
								</p>
								<br />
								<p>
									Công ty CP Đầu tư Delta Platinum sở hữu một đội ngũ quản lý và nhân viên giàu kinh nghiệm, phong cách làm việc chuyên nghiệp, có đạo đức và uy tín trong nghề nghiệp. Mỗi nhân viên đều mang trong mình một sứ mệnh đó sẵn sàng đáp ứng mọi nhu cầu của khách hàng bất cứ lúc nào và ở bất cứ nơi đâu một cách trọn vẹn nhất.
								</p>
								<br />
								<p>
									Địa ốc Việt Hưng Phát đã và đang xây dựng phát triển thành công nhiều dự án bất động sản với quy mô rộng lớn, dịch vụ đẳng cấp từ Đất nền đến Căn hộ, từ dòng sản phẩm trung cấp đến cao cấp , điển hình như:Khu Đô thị Thương mại Dịch vụ Spring Town, Khu đô thị Thương mai Dịch vụ Diamond City, Khu Đô thị Thương mại The Sun City,…
								</p>
								<br />
								<p>
									Bên cạnh đó, Bất động sản Delta Platinum luôn coi trọng ý thức trách nhiệm của doanh nghiệp đối với cộng đồng và môi trường, phát triển các sản phẩm và hoạt động kinh doanh trên tiêu chí hài hòa lợi ích doanh nghiệp với cộng đồng xã hội, thân thiện môi trường thiên nhiên. Công ty CP Đầu tư Delta Platinum luôn tích cực triển khai và tham gia các hoạt động thiện nguyện, không chỉ làm giàu cho đất nước mà còn góp một phần nhỏ bé xoa dịu nỗi đau của những con người bất hạnh đóng góp cho sự phát triển của xã hội và cộng đồng.
								</p>
								<br />
								<p>
									Bất động sản Delta Platinum luôn phấn đấu để trở thành một trong những công ty uy tín hàng đầu trong lĩnh vực đầu tư các dự án bất động sản đất nền. Công ty Bất động sản Delta Platinum luôn không ngừng nâng cao năng lực đội ngũ cán bộ nhân viên công ty và chất lượng của những dự án mà Địa ốc Delta Platinum trực tiếp phân phối cũng như đầu tư đáp ứng nhu cầu đa dạng của mọi đối tượng quý khách hàng.
								</p>




							</Box>
						</Box>
					</Grid >
				</Grid >
			</Container>
		</Box>
	)
}
