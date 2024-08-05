import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

const scrollToSection = (sectionId) => {
  const sectionElement = document.getElementById(sectionId);
  const offset = 128;
  if (sectionElement) {
    const targetScroll = sectionElement.offsetTop - offset;
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
    setOpen(false);
  }
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://valleconsultores.com.br/">Valle Consultores&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              <img
                src={
                  '../elements/assets/LogoVetorizadagreen.svg'
                }

                style={{ marginBottom: '20px' }}
                alt="logo of sitemark"
              />
            </Box>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Entre em contato conosco:
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
              ti.valle@valleconsultores.com.br
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: "5px" }}>
              (31) 3324-7286
            </Typography>


          </Box>
        </Box>


        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Emissor
          </Typography>
          <Link color="text.secondary" onClick={() => scrollToSection('features')}>
            Funções
          </Link>
          <Link color="text.secondary" onClick={() => scrollToSection('testimonials')}>
            Opiniões
          </Link>
          <Link color="text.secondary" onClick={() => scrollToSection('highlights')}>
            Diferencial
          </Link>
          <Link color="text.secondary" onClick={() => scrollToSection('faq')}>
            FAQ
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Funções
          </Typography>
          <Link color="text.secondary" href="https://alexandrefersoa.github.io/documentacao-emissor-valle/">
            Ver todas as funções
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Copyright />
      </Box>
    </Container>
  );
}
